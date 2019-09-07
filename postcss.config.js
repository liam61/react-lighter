// https://www.jianshu.com/p/477ae5cac982
// https://mobilesite.github.io/2018/02/05/vm-mobile-layout/

function getPostcssConfig() {
  return {
    exec: true, // css-in-js
    plugins: {
      'postcss-preset-env': {},
      'postcss-url': {},
      autoprefixer: {},
      'postcss-aspect-ratio-mini': {},
      'postcss-viewport-units': {},
      'postcss-nested': {},
      'postcss-write-svg': { utf8: false },
      'postcss-px-to-viewport': {
        viewportWidth: 750,
        viewportHeight: 1334,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore'],
        minPixelValue: 1,
        mediaQuery: false,
      },
    },
  }
}

module.exports = getPostcssConfig
