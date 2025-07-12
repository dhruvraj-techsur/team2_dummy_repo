import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import { ESLintPlugin } from '@typescript-eslint/eslint-plugin';

export default ESLintPlugin.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...ESLintPlugin.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);