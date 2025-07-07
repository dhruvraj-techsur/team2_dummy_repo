import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default {
  ignorePatterns: ['dist'],
  extends: [
    ...js.configs.recommended,
    ...tsPlugin.configs.recommended,
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: __dirname,
    },
    globals: globals.browser,
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};