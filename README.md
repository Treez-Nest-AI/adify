# Adix - AI-Powered Product Analysis Platform

A React/TypeScript frontend with Express.js backend for AI-powered product analysis and website screenshot capture.

## Features

### Frontend
- Modern React/TypeScript application with Vite
- Beautiful UI with Tailwind CSS and shadcn/ui components
- Product analysis and insights dashboard
- Campaign setup and management
- User authentication and payment integration

### Backend APIs
- **Web Scraping**: Extract product information from URLs
- **Screenshot Capture**: Capture website screenshots using Playwright
- **File Serving**: Serve captured screenshots and other static files

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

### Running the Application

#### Option 1: Run Frontend and Backend Separately
```bash
# Terminal 1 - Start the backend server
npm run server:dev

# Terminal 2 - Start the frontend development server
npm run dev
```

#### Option 2: Run Both Simultaneously
```bash
npm run dev:full
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Screenshot Test Page**: http://localhost:5173/screenshot-test

## API Endpoints

### Web Scraping
- **POST** `/api/scrape`
  - Body: `{ "url": "https://example.com" }`
  - Returns: Product information (image, price, details, description, brand)

### Screenshot Capture
- **POST** `/api/v1/screenshot`
  - Body: `{ "url": "https://example.com" }`
  - Returns: `{ "success": true, "data": { "screenshot_url": "/api/v1/screenshots/filename.png" } }`

- **GET** `/api/v1/screenshots/:filename`
  - Serves captured screenshot files

## Project Structure

```
adix/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── ...
├── server/                # Backend Express.js server
│   ├── index.ts           # Main server file
│   └── tsconfig.json      # TypeScript configuration
├── screenshots/           # Captured screenshots (auto-created)
└── ...
```

## Development

### Backend Development
- The server runs on port 5001 by default
- TypeScript compilation: `npm run server:build`
- Development mode with hot reload: `npm run server:dev`

### Frontend Development
- Vite development server on port 5173
- Hot module replacement enabled
- TypeScript support

## Environment Variables

Create a `.env` file in the root directory:
```env
PORT=5001
NODE_ENV=development
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- TanStack Query

### Backend
- Express.js
- TypeScript
- Playwright (for screenshot capture)
- Cheerio (for web scraping)
- CORS enabled

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 