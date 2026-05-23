/**
 * JSONP Utility - CORS Bypass for Archive.org API
 * 
 * Archive.org's Advanced Search API does not return standard CORS headers,
 * so we use JSONP (JSON with Padding) to make cross-origin requests from
 * the browser without any external CORS proxy.
 * 
 * How it works:
 * 1. Dynamically injects a <script> tag into the document head
 * 2. Appends &callback=CALLBACK_NAME to the API URL
 * 3. The server wraps the JSON response in a function call
 * 4. The browser executes the script, calling our callback with the data
 */

function fetchJSONP(url) {
  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    // Timeout to reject if the server never responds
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('JSONP request timed out'));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    const script = document.createElement('script');
    // Append callback parameter (use & if URL already has params, else ?)
    const separator = url.includes('?') ? '&' : '?';
    script.src = `${url}${separator}callback=${callbackName}`;

    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP request failed: network error or invalid URL'));
    };

    document.head.appendChild(script);
  });
}
