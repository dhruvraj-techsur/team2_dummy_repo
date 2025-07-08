import { defineConfig } from 'eslint-define-config';
import { globals } from 'globals';
import { Linter } from 'eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { experimentalUtils } from '@typescript-eslint/experimental-utils';

const compat = new FlatCompat();

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: experimentalUtils.TSParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': require('eslint-plugin-react-hooks'),
    },
    rules: {
      ...require('eslint-plugin-react-hooks').configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);