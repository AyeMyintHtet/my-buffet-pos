const px2rem = require('postcss-plugin-px2rem');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    px2rem({
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }),
    tailwindcss,
    autoprefixer
  ]
};