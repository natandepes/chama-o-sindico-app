import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angularEslint from '@angular-eslint/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.js'],
    ignores: ['node_modules', 'dist', 'coverage'],

    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },

    plugins: {
      '@angular-eslint': angularEslint,
    },

    rules: {
      'no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist', 'coverage'],

    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@angular-eslint': angularEslint,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]);
