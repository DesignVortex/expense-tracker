import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseHost = env.VITE_SUPABASE_URL ? new URL(env.VITE_SUPABASE_URL).hostname : '';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/supabase': {
          // Use direct IP to bypass local Jio DNS block entirely
          target: 'https://104.18.38.10',
          changeOrigin: true,
          secure: false, // Bypass SSL cert validation since we are using raw IP
          rewrite: (path) => path.replace(/^\/supabase/, ''),
          headers: {
            'Host': supabaseHost
          }
        },
      },
    },
  }
})
