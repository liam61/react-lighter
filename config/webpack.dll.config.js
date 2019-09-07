const webpack = require('webpack')
const { resolve } = require('./utils')
const { moduleToDll, outputDir } = require('./options')

function getDllConfig(dll, output) {
  return {
    entry: dll,
    output: {
      filename: '[name].dll.js',
      path: resolve(output),
      libraryTarget: 'var',
      library: '_dll_[name]_[hash]', // 全局变量名称
    },
    mode: 'production',
    plugins: [
      new webpack.DllPlugin({
        name: '_dll_[name]_[hash]', // 和 library 中一致，输出的 manifest.json 中的 name 值
        path: resolve(output, '[name].manifest.json'),
      }),
    ],
  }
}

module.exports = getDllConfig(moduleToDll, outputDir)
