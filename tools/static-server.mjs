import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.cwd());
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 8000);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function resolveRequestPath(url) {
  const requestedPath = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname);
  const normalizedPath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = resolve(join(root, normalizedPath));

  if (!filePath.startsWith(root)) {
    return null;
  }

  if (!existsSync(filePath)) {
    return null;
  }

  return statSync(filePath).isDirectory() ? join(filePath, 'index.html') : filePath;
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url ?? '/');

  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'content-type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Help-me static server running at http://${host}:${port}`);
});
