import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsConfigs from '@typescript-eslint/eslint-config';

export default {
  ignorePatterns: ['dist'],
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended',
    ...tsConfigs.configs.recommended.extends,
  ],
  files: ['**/*.{ts,tsx}'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  globals: globals.browser,
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