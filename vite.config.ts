import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // base: '/secret-games/',
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
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
    },
  },
})
