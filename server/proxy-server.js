const http = require('http');
const https = require('https');
const { URL } = require('url');

// Simple proxy server that forwards /api/* requests to the remote host
// and adds CORS headers so the browser accepts responses during development.

const PORT = process.env.PROXY_PORT || 5000;
const TARGET_BASE = 'http://103.133.215.48';

function forward(req, res) {
  try {
    const incomingUrl = new URL(req.url, `http://${req.headers.host}`);
    const targetUrl = new URL(incomingUrl.pathname + incomingUrl.search, TARGET_BASE);

    const client = targetUrl.protocol === 'https:' ? https : http;

    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
      path: targetUrl.pathname + targetUrl.search,
      method: req.method,
      headers: Object.assign({}, req.headers, { host: targetUrl.hostname }),
    };

    const proxyReq = client.request(options, function (proxyRes) {
      // Propagate status and headers but ensure CORS is allowed for localhost development
      res.writeHead(proxyRes.statusCode, Object.assign({}, proxyRes.headers, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'access-control-allow-headers': 'Content-Type, Authorization',
      }));
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', function (err) {
      res.writeHead(502, { 'Content-Type': 'text/plain', 'access-control-allow-origin': '*' });
      res.end('Proxy error: ' + String(err));
    });

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      req.pipe(proxyReq, { end: true });
    } else {
      proxyReq.end();
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain', 'access-control-allow-origin': '*' });
    res.end('Proxy server error: ' + String(err));
  }
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  // Only proxy requests that begin with /api/
  if (req.url && req.url.startsWith('/api/')) {
    return forward(req, res);
  }

  // For other requests, return a simple message
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Proxy running. Use /api/... to forward requests to the remote API.');
});

server.listen(PORT, () => {
  console.log(`Dev proxy listening on http://localhost:${PORT}/ and forwarding /api/* to ${TARGET_BASE}`);
});
