import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const config: UserConfig = {
  plugins: [react()],
};

export default defineConfig(config);