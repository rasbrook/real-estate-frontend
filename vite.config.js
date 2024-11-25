import { defineConfig } from 'vite'; 
import { nodePolyfills } from 'vite-plugin-node-polyfills'; 


export default defineConfig({
  plugins: [nodePolyfills()],
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
