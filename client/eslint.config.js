import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default {
  ignorePatterns: ['dist'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        es2024: true,
      },
      globals: {
        ...globals.browser,
      },
      plugins: ['react-hooks', 'react-refresh', '@typescript-eslint'],
      extends: [
        js.configs.recommended,
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
    },
  ],
};