// Serves the built Vue application when using the App Service fallback.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405).end();
    return;
  }
  let file;
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if (file === root || !path.extname(file)) file = path.join(root, 'index.html');
  } catch {
    response.writeHead(400).end();
    return;
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': stat.size });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(file).pipe(response);
  });
}).listen(process.env.PORT || 8080);
