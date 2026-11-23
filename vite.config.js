import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import leadHandler from './api/lead.js'

function localLeadApiPlugin() {
  return {
    name: 'local-lead-api',
    configureServer(server) {
      server.middlewares.use('/api/lead', async (req, res) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', async () => {
          const rawBody = Buffer.concat(chunks).toString('utf8');
          req.body = rawBody || '{}';
          const wrappedRes = {
            status(code) {
              res.statusCode = code;
              return this;
            },
            json(payload) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(payload));
            },
          };
          await leadHandler(req, wrappedRes);
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.TELEGRAM_BOT_TOKEN) process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  if (env.TELEGRAM_CHAT_ID) process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;

  return {
    plugins: [tailwindcss(), react(), localLeadApiPlugin()],
  };
});
