from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from playwright.sync_api import sync_playwright
import os
import uuid
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Configuration
SCREENSHOTS_DIR = 'screenshots'
if not os.path.exists(SCREENSHOTS_DIR):
    os.makedirs(SCREENSHOTS_DIR)

app = Flask(__name__)
CORS(app)

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
    if not url.startswith(('http://', 'https')):
        url = 'https://' + url
    
    if not is_valid_url(url):
        return None, "Invalid or inaccessible URL"
    
    return url, None

def capture_website_screenshot(url, viewport_width=1920, viewport_height=1080):
    """Capture screenshot of a website using Playwright"""
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-dev-shm-usage'])
            page = browser.new_page(viewport={'width': viewport_width, 'height': viewport_height})
            page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            })
            page.goto(url, wait_until='networkidle', timeout=30000)
            page.wait_for_timeout(2000)
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"screenshot_{timestamp}_{uuid.uuid4().hex[:8]}.png"
            filepath = os.path.join(SCREENSHOTS_DIR, filename)
            
            screenshot_bytes = page.screenshot(full_page=False)
            with open(filepath, 'wb') as f:
                f.write(screenshot_bytes)
            
            browser.close()
            
            return {'success': True, 'filename': filename, 'filepath': filepath, 'url': url}
    except Exception as e:
        print(f"Screenshot error: {e}")
        return {'success': False, 'error': str(e)}

def scrape_website_data(url):
    """Scrape website for product data"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'lxml')
        
        title = soup.find('title').get_text(strip=True) if soup.find('title') else "No title found"
        
        description = soup.find('meta', attrs={'name': 'description'})
        description = description['content'] if description else "No description found"
        
        image = soup.find('meta', property='og:image')
        image = image['content'] if image else None
        if image:
            image = urljoin(url, image)
        
        # Simplified price and brand extraction (highly site-dependent)
        price = "Price not found"
        brand = "Brand not found"
        
        return {
            'success': True,
            'url': url,
            'title': title,
            'description': description,
            'image': image,
            'price': price,
            'brand': brand,
            'details': '' # Placeholder for more detailed scraping
        }
    except Exception as e:
        print(f"Scraping error: {e}")
        return {'success': False, 'error': str(e)}

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

# API Endpoints
@app.route('/api/v1/analyze', methods=['POST'])
def analyze_api():
    """Analyze website URL to scrape data and capture a screenshot"""
    if not request.is_json:
        return api_error("Content-Type must be application/json", 400, "INVALID_CONTENT_TYPE")
    
    data = request.get_json()
    if not data:
        return api_error("Invalid JSON data", 400, "INVALID_JSON")
    
    url = data.get('url', '').strip()
    if not url:
        return api_error("URL is required", 400, "MISSING_URL")
    
    validated_url, error = validate_url(url)
    if error:
        return api_error(error, 400, "INVALID_URL")
    
    # Scrape data and capture screenshot
    scrape_result = scrape_website_data(validated_url)
    screenshot_result = capture_website_screenshot(validated_url)
    
    if not scrape_result['success']:
        return api_error(f"Failed to scrape website: {scrape_result['error']}", 500, "SCRAPING_ERROR")
    
    response_data = scrape_result
    if screenshot_result['success']:
        response_data['screenshot_url'] = f'/api/v1/screenshots/{screenshot_result["filename"]}'
    else:
        response_data['screenshot_error'] = screenshot_result['error']
        
    return api_response(data=response_data)

@app.route('/api/v1/screenshots/<filename>', methods=['GET'])
def serve_screenshot(filename):
    """Serve screenshot files"""
    try:
        return send_from_directory(SCREENSHOTS_DIR, filename)
    except Exception as e:
        return api_error("Screenshot not found", 404, "FILE_NOT_FOUND")

if __name__ == '__main__':
    print("🚀 Starting Web Analyzer API...")
    print("📈 API: POST /api/v1/analyze")
    print("📁 Screenshots: GET /api/v1/screenshots/<filename>")
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000,
        threaded=True
    )
