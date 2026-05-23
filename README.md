# RealiveNES

A browser-native NES game selector and ROM fetcher that pulls a live directory list from Archive.org's NES ROM collection — without any external CORS proxies.

## How It Works

### CORS Bypass via JSONP

Archive.org's Advanced Search API doesn't return `Access-Control-Allow-Origin` headers for standard `fetch()` requests. Instead of relying on an external CORS proxy, we use **JSONP (JSON with Padding)**:

1. A `<script>` tag is dynamically injected into the document
2. The Archive.org API URL is appended with `&callback=FUNCTION_NAME`
3. The server wraps its JSON response in a function call
4. The browser executes the script, invoking our callback with the data

### Architecture

```
index.html          - Main page with game selector UI
js/
├── jsonp.js        - JSONP utility (CORS bypass)
├── archive-api.js  - Archive.org API integration
├── rom-fetcher.js  - ROM file discovery & download
└── app.js          - UI controller & event handling
```

## Features

- **Live ROM Directory**: Fetches NES ROM listings directly from Archive.org
- **Search**: Filter ROMs by title/description
- **Pagination**: Browse through large collections
- **Direct Downloads**: One-click ROM file downloads
- **No Server Required**: Runs entirely in the browser
- **No CORS Proxy**: Uses JSONP for cross-origin requests

## Usage

Simply open `index.html` in any modern web browser. No build tools or server needed.

```bash
# Or serve with any static file server
npx serve .
```

## License

MIT
