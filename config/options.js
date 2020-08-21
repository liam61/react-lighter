const { name } = require('../package.json')

const entryDir = 'src'
const outputDir = 'dist'

// 必要参数
const baseOptions = {
  entryFile: `${entryDir}/index.tsx`,
  templateFile: `${entryDir}/index.tmpl.html`,
  templateTitle: name,
  cssPath: 'styles',
  purifycssFile: [`${entryDir}/*.html`, `${entryDir}/**/*.js`],
  assetsPath: 'assets',
  moduleToDll: {
    rl: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'axios', 'zone.js'],
  },
  dllFiles: ['rl.dll.js', 'rl.manifest.json'],
}

// 可选参数
const extraOptions = {
  // 是否抽离出 css
  // 选择 true 在开发模式中 react-hot-loader 不能热加载抽离出去的 css
  // 选择 false purifycss-webpack 不能去除无用的 css
  useCssExtract: false,
}

module.exports = Object.assign(baseOptions, { entryDir, outputDir }, extraOptions)
