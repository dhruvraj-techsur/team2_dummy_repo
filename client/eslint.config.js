import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['dist'],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: globals.browser,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: new URL('.', import.meta.url).pathname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: require('eslint-plugin-react'),
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
});