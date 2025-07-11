import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default {
  ignores: ['dist'],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: new URL('.', import.meta.url).pathname,
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@typescript-eslint': tsPlugin,
  },
  extends: [
    js.configs.recommended,
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...tsPlugin.configs.recommended.rules,
    ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};