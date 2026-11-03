const { defineConfig } = require('@rsbuild/core');
const { pluginReact } = require('@rsbuild/plugin-react');
const { pluginLess } = require('@rsbuild/plugin-less');
const { pluginSass } = require('@rsbuild/plugin-sass');
const path = require('path');

const resolve = (p) => path.resolve(__dirname, p);

module.exports = defineConfig({
  plugins: [pluginReact(), pluginLess(), pluginSass()],
  source: {
    entry: { index: './src/index.js' },
    alias: { '@': resolve('./src') }
  },
  server: { historyApiFallback: true },
  html: { template: './public/index.html' },
  output: { distPath: { root: 'build' } }
});
