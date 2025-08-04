from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from playwright.sync_api import sync_playwright
import os
import uuid
from datetime import datetime
import requests

# Configuration
SCREENSHOTS_DIR = 'screenshots'
if not os.path.exists(SCREENSHOTS_DIR):
    os.makedirs(SCREENSHOTS_DIR)

app = Flask(__name__)
CORS(app)

# API Response Helpers
def api_response(success=True, data=None, message="", status_code=200):
    """Standard API response format"""
    response = {
        "success": success,
        "message": message,
        "timestamp": datetime.now().isoformat(),
        "data": data or {}
    }
    return jsonify(response), status_code

def api_error(message="An error occurred", status_code=400, error_code=None):
    """Standard API error response"""
    response = {
        "success": False,
        "message": message,
        "error_code": error_code,
        "timestamp": datetime.now().isoformat()
    }
    return jsonify(response), status_code

# Utility Functions
def is_valid_url(url):
    """Check if the URL is valid and accessible"""
    try:
        result = requests.get(url, timeout=5)
        return result.status_code == 200
    except:
        return False

def validate_url(url):
    """Validate and normalize URL"""
    if not url or not url.strip():
        return None, "URL is required"
    
    url = url.strip()
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    if not is_valid_url(url):
        return None, "Invalid or inaccessible URL"
    
    return url, None

def capture_website_screenshot(url, viewport_width=1920, viewport_height=1080):
    """Capture screenshot of a website using Playwright"""
    try:
        with sync_playwright() as p:
            # Launch browser
            browser = p.chromium.launch(
                headless=True,
                args=['--no-sandbox', '--disable-dev-shm-usage']
            )
            
            # Create a new page
            page = browser.new_page(
                viewport={'width': viewport_width, 'height': viewport_height}
            )
            
            # Set user agent to avoid bot detection
            page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            })
            
            # Navigate to the URL with timeout
            page.goto(url, wait_until='networkidle', timeout=30000)
            
            # Wait a bit for dynamic content to load
            page.wait_for_timeout(2000)
            
            # Generate unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"screenshot_{timestamp}_{uuid.uuid4().hex[:8]}.png"
            filepath = os.path.join(SCREENSHOTS_DIR, filename)
            
            # Take screenshot
            page.screenshot(
                path=filepath,
                full_page=False  # Capture only visible viewport (first view)
            )
            
            browser.close()
            
            return {
                'success': True,
                'filename': filename,
                'filepath': filepath,
                'url': url
            }
            
    except Exception as e:
        print(f"Screenshot error: {e}")
        return {
            'success': False,
            'error': str(e)
        }

# API Endpoints

@app.route('/api/v1/screenshot/health', methods=['GET'])
def health_check():
    """Health check endpoint for screenshot service"""
    return api_response(
        success=True,
        data={
            'status': 'healthy',
            'service': 'Screenshot API',
            'version': '1.0.0',
            'screenshots_dir': SCREENSHOTS_DIR,
            'screenshots_count': len(os.listdir(SCREENSHOTS_DIR)) if os.path.exists(SCREENSHOTS_DIR) else 0
        },
        message="Screenshot API is running successfully"
    )

@app.route('/api/v1/screenshot/capture', methods=['POST'])
def capture_screenshot():
    """Capture website screenshot"""
    try:
        if not request.is_json:
            return api_error("Content-Type must be application/json", 400, "INVALID_CONTENT_TYPE")
        
        data = request.get_json()
        if not data:
            return api_error("Invalid JSON data", 400, "INVALID_JSON")
        
        url = data.get('url', '').strip()
        viewport_width = data.get('viewport_width', 1920)
        viewport_height = data.get('viewport_height', 1080)
        
        # Validate URL
        validated_url, error = validate_url(url)
        if error:
            return api_error(error, 400, "INVALID_URL")
        
        # Capture screenshot
        result = capture_website_screenshot(validated_url, viewport_width, viewport_height)
        
        if result['success']:
            return api_response(
                success=True,
                data={
                    'filename': result['filename'],
                    'screenshot_url': f'/api/v1/screenshot/download/{result["filename"]}',
                    'captured_url': validated_url,
                    'file_size': os.path.getsize(result['filepath']) if os.path.exists(result['filepath']) else 0,
                    'created_at': datetime.now().isoformat()
                },
                message="Screenshot captured successfully"
            )
        else:
            return api_error(f"Failed to capture screenshot: {result['error']}", 500, "SCREENSHOT_ERROR")
        
    except Exception as e:
        print(f"Screenshot API error: {e}")
        return api_error(f"Server error: {str(e)}", 500, "SERVER_ERROR")

@app.route('/api/v1/screenshot/download/<filename>', methods=['GET'])
def download_screenshot(filename):
    """Download a specific screenshot file"""
    try:
        filepath = os.path.join(SCREENSHOTS_DIR, filename)
        if not os.path.exists(filepath):
            return api_error("Screenshot not found", 404, "FILE_NOT_FOUND")
        
        return send_from_directory(SCREENSHOTS_DIR, filename)
    except Exception as e:
        return api_error("Error serving screenshot", 500, "SERVE_ERROR")

@app.route('/api/v1/screenshot/list', methods=['GET'])
def list_screenshots():
    """List all screenshots"""
    try:
        if not os.path.exists(SCREENSHOTS_DIR):
            return api_response(
                success=True,
                data={'screenshots': []},
                message="No screenshots found"
            )
        
        screenshots = []
        for filename in os.listdir(SCREENSHOTS_DIR):
            if filename.endswith(('.png', '.jpg', '.jpeg')):
                try:
                    filepath = os.path.join(SCREENSHOTS_DIR, filename)
                    file_stat = os.stat(filepath)
                    screenshots.append({
                        'filename': filename,
                        'size': file_stat.st_size,
                        'created': datetime.fromtimestamp(file_stat.st_ctime).isoformat(),
                        'download_url': f'/api/v1/screenshot/download/{filename}'
                    })
                except Exception as e:
                    print(f"Error processing screenshot {filename}: {e}")
                    continue
        
        # Sort by creation time (newest first)
        screenshots.sort(key=lambda x: x['created'], reverse=True)
        
        return api_response(
            success=True,
            data={'screenshots': screenshots},
            message=f"Found {len(screenshots)} screenshots"
        )
        
    except Exception as e:
        print(f"List screenshots error: {e}")
        return api_error(f"Error listing screenshots: {str(e)}", 500, "LIST_ERROR")

@app.route('/api/v1/screenshot/delete/<filename>', methods=['DELETE'])
def delete_screenshot(filename):
    """Delete a specific screenshot"""
    try:
        filepath = os.path.join(SCREENSHOTS_DIR, filename)
        if not os.path.exists(filepath):
            return api_error("Screenshot not found", 404, "FILE_NOT_FOUND")
        
        os.remove(filepath)
        
        return api_response(
            success=True,
            data={'deleted_filename': filename},
            message="Screenshot deleted successfully"
        )
        
    except Exception as e:
        print(f"Delete screenshot error: {e}")
        return api_error(f"Error deleting screenshot: {str(e)}", 500, "DELETE_ERROR")

@app.route('/api/v1/screenshot/cleanup', methods=['POST'])
def cleanup_screenshots():
    """Clean up old screenshots (older than 24 hours)"""
    try:
        if not os.path.exists(SCREENSHOTS_DIR):
            return api_response(
                success=True,
                data={'deleted_count': 0},
                message="No screenshots to clean up"
            )
        
        current_time = datetime.now()
        deleted_count = 0
        retention_hours = 24
        
        for filename in os.listdir(SCREENSHOTS_DIR):
            if filename.endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(SCREENSHOTS_DIR, filename)
                file_modified = datetime.fromtimestamp(os.path.getmtime(filepath))
                
                # Check if file is older than retention period
                if (current_time - file_modified).total_seconds() > (retention_hours * 3600):
                    try:
                        os.remove(filepath)
                        deleted_count += 1
                    except Exception as e:
                        print(f"Error deleting {filename}: {e}")
        
        return api_response(
            success=True,
            data={'deleted_count': deleted_count},
            message=f"Cleaned up {deleted_count} old screenshots"
        )
        
    except Exception as e:
        print(f"Cleanup error: {e}")
        return api_error(f"Error during cleanup: {str(e)}", 500, "CLEANUP_ERROR")

@app.route('/api/v1/screenshot/docs', methods=['GET'])
def api_documentation():
    """API documentation endpoint"""
    docs = {
        "api_name": "Screenshot API",
        "version": "1.0.0",
        "description": "API for capturing, storing, and managing website screenshots",
        "base_url": "/api/v1/screenshot",
        "endpoints": {
            "health": {
                "method": "GET",
                "path": "/health",
                "description": "Check screenshot service health",
                "response": "Health status and service information"
            },
            "capture": {
                "method": "POST",
                "path": "/capture",
                "description": "Capture website screenshot",
                "body": {
                    "url": "string (required)",
                    "viewport_width": "integer (optional, default: 1920)",
                    "viewport_height": "integer (optional, default: 1080)"
                },
                "response": "Screenshot filename, URL, and metadata"
            },
            "download": {
                "method": "GET",
                "path": "/download/{filename}",
                "description": "Download a specific screenshot file",
                "response": "Image file"
            },
            "list": {
                "method": "GET",
                "path": "/list",
                "description": "List all captured screenshots",
                "response": "Array of screenshot metadata"
            },
            "delete": {
                "method": "DELETE",
                "path": "/delete/{filename}",
                "description": "Delete a specific screenshot",
                "response": "Deletion confirmation"
            },
            "cleanup": {
                "method": "POST",
                "path": "/cleanup",
                "description": "Clean up old screenshots (24+ hours)",
                "response": "Number of deleted files"
            }
        },
        "response_format": {
            "success": "boolean",
            "message": "string",
            "timestamp": "ISO datetime string",
            "data": "object"
        },
        "error_codes": {
            "INVALID_CONTENT_TYPE": "Request must be JSON",
            "INVALID_JSON": "Invalid JSON data",
            "INVALID_URL": "Invalid or inaccessible URL",
            "SCREENSHOT_ERROR": "Failed to capture screenshot",
            "FILE_NOT_FOUND": "Screenshot file not found",
            "LIST_ERROR": "Error listing screenshots",
            "DELETE_ERROR": "Error deleting screenshot",
            "SERVE_ERROR": "Error serving screenshot",
            "SERVER_ERROR": "Internal server error",
            "CLEANUP_ERROR": "Error during cleanup"
        }
    }
    
    return api_response(
        success=True,
        data=docs,
        message="Screenshot API documentation"
    )

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return api_error("Endpoint not found", 404, "NOT_FOUND")

@app.errorhandler(405)
def method_not_allowed(error):
    return api_error("Method not allowed", 405, "METHOD_NOT_ALLOWED")

@app.errorhandler(500)
def internal_error(error):
    return api_error("Internal server error", 500, "INTERNAL_ERROR")

if __name__ == '__main__':
    print("📸 Starting Screenshot API...")
    print("📚 API Documentation: http://localhost:5001/api/v1/screenshot/docs")
    print("🏥 Health Check: http://localhost:5001/api/v1/screenshot/health")
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5001,
        threaded=True
    ) 