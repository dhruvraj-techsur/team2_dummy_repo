import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for the React client application.
 */
export default defineConfig({
  plugins: [react()],
});