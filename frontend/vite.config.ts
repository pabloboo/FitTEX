import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: 'https://auth.inditex.com:443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ''),
      },
      '/api/products': {
        target: 'https://api-sandbox.inditex.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/products/, ''),
      },
      '/api/search': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search/, '/search'),
      },
      '/api/orders': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/orders/, '/orders'),
      },
    },
  },
});