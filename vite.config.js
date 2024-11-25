import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://estate-backend-1-d4pa.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if your backend is using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: if you need to rewrite the path
      },
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  build: {
    rollupOptions: {
      // Externalize dependencies to improve build performance
      external: ['react', 'react-dom'],
    },
  },
});
