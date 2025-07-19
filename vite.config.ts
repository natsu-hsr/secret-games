import {defineConfig} from 'vite'
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react'

export default defineConfig({
  // base: '/secret-games/',
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
    eslint(),
  ],
  css: {
    devSourcemap: true,
  },
  server: {
    proxy: {
      '/api_test.php': {
        target: 'http://2.59.41.201',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api_test\.php/, '/api_test.php'),
      },
      '/api.php': {
        target: 'http://2.59.41.201',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\.php/, '/api.php'),
      },
      '/save.php': {
        target: 'http://2.59.41.201',
        changeOrigin: true,
      },
    },
  },
})
