module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 3,
      viewportUnit: 'rem',
      selectorBlackList: ['.ignore', '.hairlines', 'html'],
      minPixelValue: 1,
      mediaQuery: false,
      fontViewportUnit: 'rem'
    }
  }
};
