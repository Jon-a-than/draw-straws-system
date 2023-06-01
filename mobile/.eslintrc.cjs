/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@unocss'
  ],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    '@unocss/order': 'warn',
    '@unocss/order-attributify': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    'vue/multi-word-component-names': 'off'
  }
}
