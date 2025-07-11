import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignorePatterns: ['dist'],
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      extends: [js.configs.recommended],
      languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        globals: { ...globals.browser, ...globals.es2020 },
      },
      plugins: {
        'react-refresh': reactRefresh,
      },
      rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: [...tseslint.configs.recommended],
      languageOptions: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: new URL('.', import.meta.url).pathname,
        },
        globals: { ...globals.browser, ...globals.es2020 },
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
    },
  ],
});