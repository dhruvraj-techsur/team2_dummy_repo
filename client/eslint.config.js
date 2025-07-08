import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { parserOptions } from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...parserOptions,
        ecmaVersion: 2026,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    extends: [
      js.configs.recommended,
      '@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]);