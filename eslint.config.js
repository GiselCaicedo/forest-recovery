import js from '@eslint/js';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, 'react-hooks': hooks },
    rules: {
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      ...hooks.configs.recommended.rules,
    },
  },
];
