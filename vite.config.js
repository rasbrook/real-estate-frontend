
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:"https://estate-backend-1-d4pa.onrender.com",
        
      },
    },
  },
  build: { rollupOptions: { external: ['react', 'react-dom', 'react-spinners'], }, },
  plugins: [
    nodePolyfills({
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
})


// https://vitejs.dev/config/

