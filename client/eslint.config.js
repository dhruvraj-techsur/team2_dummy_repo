import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default {
  ignores: ['dist'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};