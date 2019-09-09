const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('./utils')
const options = require('./options')
const getBaseConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function getDevConfig(opts) {
  return merge(getBaseConfig(opts), {
    devServer: {
      contentBase: resolve(opts.outputDir), // 本地服务器加载的页面所在的目录，默认 / 是在当前的开发文件目录
      disableHostCheck: true,
      compress: true,
      historyApiFallback: true, // 不跳转
      host: '0.0.0.0',
      port: 3000,
      inline: true,
      quiet: true, // 让 FriendlyErrorsWebpackPlugin 取而代之
      open: true,
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsPlugin(),
    ],
  })
}

module.exports = getDevConfig(options)
