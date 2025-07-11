import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default {
  ignorePatterns: ['dist'],
  extends: [js.configs.recommended],
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
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
  },
};