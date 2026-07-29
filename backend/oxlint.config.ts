// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig({
  ignorePatterns: ['**/node_modules/**', '**/*.js', '**/*.mjs', 'dist/**', 'eslint.config.ts'],

  rules: {
    'no-console': 'off',
    'no-extra-boolean-cast': 'off',
    'prefer-const': 'warn',

    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    'no-unused-expressions': 'warn',
  },
});
