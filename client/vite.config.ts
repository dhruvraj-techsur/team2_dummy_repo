import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});