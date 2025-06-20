import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node // ambiente Node
      }
    },
    plugins: {
      js,
      prettier: pluginPrettier
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error' // usa o Prettier como regra de lint
    }
  }
]);
