import { defineConfig } from 'eslint-define-config';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { parserOptions } from '@typescript-eslint/parser';

export default defineConfig({
  ignores: ['dist'],
  extends: [
    js.configs.recommended,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-refresh/recommended',
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ...parserOptions,
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
      tsconfigRootDir: import.meta.dirname,
    },
    ecmaVersion: 2026,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
});