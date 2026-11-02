// S8: ESLint 9 flat config (thay .eslintrc.js cũ; airbnb18 đã ngừng dùng)
// airbnb không hỗ trợ flat config chính thức — ý đồ của các rule được ghi lại bằng comment miễn trừ
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: [['@babel/preset-react', { runtime: 'automatic' }]] },
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        window: 'readonly', document: 'readonly', localStorage: 'readonly',
        console: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly',
        setInterval: 'readonly', clearInterval: 'readonly', fetch: 'readonly',
        location: 'readonly', history: 'readonly', URL: 'readonly',
        navigator: 'readonly', FormData: 'readonly', XMLHttpRequest: 'readonly',
        performance: 'readonly', Blob: 'readonly', requestAnimationFrame: 'readonly',
        URLSearchParams: 'readonly', ResizeObserver: 'readonly', FileReader: 'readonly',
        HTMLInputElement: 'readonly', queueMicrotask: 'readonly',
        process: 'readonly', IS_FULL: 'readonly'
      }
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks')
    },
    rules: {
      // Các rule airbnb được giữ lại (tập con tự dựng cho flat config)
      'no-unused-vars': ['warn', { args: 'none' }],
      'no-undef': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  {
    files: ['src/styles/theme/*.js'],
    languageOptions: { globals: { module: 'readonly', require: 'readonly' } }
  },
  {
    ignores: ['build/**', 'node_modules/**', 'public/**', 'patches/**']
  }
];
