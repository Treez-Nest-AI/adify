# Python Backend for Adix

This directory contains the Python backend services for the Adix project, providing screenshot capture and website analysis capabilities.

## Setup

1. **Install Python dependencies:**
   ```bash
   npm run python:install
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run python:setup
   ```

## Available Services

### 1. Basic Screenshot API (`app.py`)
- **Port:** 5000
- **Start:** `npm run python:dev`
- **Endpoint:** `POST /api/v1/screenshot`
- **Description:** Simple screenshot capture service

### 2. Enhanced Screenshot API (`screenshot_api.py`)
- **Port:** 5001
- **Start:** `npm run python:screenshot`
- **Description:** Full-featured screenshot service with management capabilities

## API Endpoints (Enhanced API)

### Health Check
- `GET /api/v1/screenshot/health` - Check service status

### Screenshot Operations
- `POST /api/v1/screenshot/capture` - Capture website screenshot
- `GET /api/v1/screenshot/download/{filename}` - Download screenshot
- `GET /api/v1/screenshot/list` - List all screenshots
- `DELETE /api/v1/screenshot/delete/{filename}` - Delete screenshot
- `POST /api/v1/screenshot/cleanup` - Clean up old screenshots

### Documentation
- `GET /api/v1/screenshot/docs` - API documentation

## Usage Examples

### Capture Screenshot
```bash
curl -X POST http://localhost:5001/api/v1/screenshot/capture \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "viewport_width": 1920, "viewport_height": 1080}'
```

### Health Check
```bash
curl http://localhost:5001/api/v1/screenshot/health
```

### List Screenshots
```bash
curl http://localhost:5001/api/v1/screenshot/list
```

## Configuration

- Screenshots are stored in the `screenshots/` directory
- Default viewport: 1920x1080
- Screenshot retention: 24 hours (auto-cleanup)
- CORS enabled for frontend integration

## Integration with Frontend

The Python backend can be used alongside the existing Node.js backend:

- **Node.js Backend:** Port 5001 (product scraping, general API)
- **Python Backend:** Port 5000/5001 (screenshot services)

Update your frontend API calls to use the appropriate backend based on the functionality needed. 