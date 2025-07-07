import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default {
  ignores: ['dist'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: new URL('.', import.meta.url).pathname,
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: globals.browser,
    env: {
      browser: true,
      es2020: true,
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...tsPlugin.configs.recommended.rules,
    ...react.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  extends: [
    js.configs.recommended,
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};