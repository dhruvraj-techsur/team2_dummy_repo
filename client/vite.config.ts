import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React project
const config: UserConfig = {
  plugins: [react()],
};

export default defineConfig(config);