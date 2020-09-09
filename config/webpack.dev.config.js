const webpack = require('webpack')
const merge = require('webpack-merge').default
const { resolve } = require('./utils')
const options = require('./options')
const getBaseConfig = require('./webpack.base.config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

function getDevConfig(opts) {
  return merge(getBaseConfig(opts), {
    devServer: {
      contentBase: resolve(opts.outputDir), // 本地服务器加载的页面所在的目录，默认 / 是在当前的开发文件目录
      disableHostCheck: true,
      compress: true,
      historyApiFallback: true, // 不跳转
      host: '0.0.0.0',
      port: 4000,
      inline: true,
      quiet: true, // 让 FriendlyErrorsWebpackPlugin 取而代之
      hot: true,
      // open: true,
    },
    plugins: [new ReactRefreshWebpackPlugin(), new webpack.NamedModulesPlugin()],
  })
}

module.exports = getDevConfig(options)
