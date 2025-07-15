# React URL Shortener Web App

A fully client-side URL shortener with analytics and Material UI, built for localhost:3000.

## Features
- Shorten up to 5 URLs at once
- Custom or auto-generated shortcodes
- Expiry and validity management
- Analytics: click count, timestamps, referrer, coarse location
- All data persisted in localStorage
- Material UI for responsive design
- All logging via provided Logging Middleware

## Getting Started
1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure
- `src/components/` — React components
- `src/utils/` — Utility functions (validation, storage, geolocation)
- `src/logging/Logger.js` — Logging Middleware integration

## Assumptions
- No backend, all logic is client-side
- Geolocation via public API
- Logging Middleware is already implemented
