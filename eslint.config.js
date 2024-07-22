import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2022, // Define o suporte ao ECMAScript 2020
      sourceType: 'module', // Define que o código está usando módulos ES
    },
    plugins: {
      // Defina plugins adicionais se necessário
    },
    rules: {
      // Suas regras personalizadas aqui
    },
  },
  pluginJs.configs.recommended,
];
