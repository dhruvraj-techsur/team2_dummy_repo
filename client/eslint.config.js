import { defineConfig } from 'eslint/config';
import { configs as jsConfigs } from '@eslint/js';
import { configs as tsConfigs, parser as tsParser, plugin as tsPlugin } from 'typescript-eslint';
import { plugin as reactPlugin } from 'eslint-plugin-react';
import { plugin as reactHooksPlugin } from 'eslint-plugin-react-hooks';
import { plugin as reactRefreshPlugin } from 'eslint-plugin-react-refresh';

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      ...tsConfigs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]);