import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        verbatimModuleSyntax: true,
      },
      globals: globals.browser,
      plugins: {
        '@typescript-eslint': tsPlugin,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
    },
    extends: [
      js.configs.recommended,
      tsPlugin.configs.recommended,
      tsPlugin.configs['recommended-requiring-type-checking'],
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];