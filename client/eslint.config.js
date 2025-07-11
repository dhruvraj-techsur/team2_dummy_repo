import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsConfigs from '@typescript-eslint/eslint-config';

export default {
  ignores: ['dist'],
  extends: [
    js.configs.recommended,
    ...tsConfigs.recommended,
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    globals: globals.browser,
    env: {
      browser: true,
      es2020: true,
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};