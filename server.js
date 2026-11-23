import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import leadHandler from './api/lead.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local or .env if present (zero external dependencies)
for (const envFile of ['.env.local', '.env']) {
  const fullPath = path.join(__dirname, envFile);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || '127.0.0.1';

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (urlPath === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (urlPath === '/api/lead') {
    const chunks = [];
    let size = 0;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 64 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'Payload too large' }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', async () => {
      req.body = Buffer.concat(chunks).toString('utf8') || '{}';
      const wrappedRes = {
        status(code) {
          res.statusCode = code;
          return this;
        },
        json(payload) {
          if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
          }
          res.end(JSON.stringify(payload));
        },
      };
      try {
        await leadHandler(req, wrappedRes);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ ok: false, error: err?.message || 'Internal Server Error' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ ok: false, error: 'Not Found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`[moroz314-lead] listening on http://${HOST}:${PORT}`);
});
