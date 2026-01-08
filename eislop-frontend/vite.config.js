import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req) => {
            console.error('[Proxy Error] /api', req?.method, req?.url, err?.code || err?.message);
          });
        }
      },
      '/auth': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req) => {
            console.error('[Proxy Error] /auth', req?.method, req?.url, err?.code || err?.message);
          });
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
