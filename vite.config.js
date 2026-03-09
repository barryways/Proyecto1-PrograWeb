import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const webhookUrl = env.VITE_GOOGLE_SHEETS_WEBHOOK_URL

  let proxy = undefined

  if (webhookUrl) {
    const parsed = new URL(webhookUrl)
    proxy = {
      '/api/google-sheets': {
        target: parsed.origin,
        changeOrigin: true,
        secure: true,
        rewrite: () => `${parsed.pathname}${parsed.search}`,
      },
    }
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    server: {
      proxy,
    },
  }
})
