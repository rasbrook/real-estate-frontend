// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://estate-backend-1-d4pa.onrender.com', // Replace with your API endpoint
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      // Externalize dependencies to improve build performance
      external: ['react', 'react-dom', 'react-spinners']
    }
  }
});
