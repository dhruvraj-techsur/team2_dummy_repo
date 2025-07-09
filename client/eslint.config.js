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
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: false,
      },
      env: {
        browser: true,
        es2020: true,
      },
      globals: globals.browser,
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      },
      extends: [
        js.configs.recommended,
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};