const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('./utils')
const options = require('./options')
const getBaseConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

process.env.NODE_ENV = 'development'

function getDevConfig(opts) {
  return merge(getBaseConfig(opts), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: resolve(opts.outputPath), // 本地服务器加载的页面所在的目录，默认 / 是在当前的开发文件目录
      port: 3000,
      disableHostCheck: true,
      compress: true,
      inline: true, // 全部刷新，当源文件改变时会自动刷新页面
      historyApiFallback: true, // 不跳转
      quiet: true, // 不显示 devServer 的 Console 信息，让 FriendlyErrorsWebpackPlugin 取而代之
      open: true,
      hot: true, // 打开热替换
      overlay: {
        errors: true
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // 实现也更新，需要在总 js 入口处判断 module.hot
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsPlugin(),
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      })
    ]
  })
}

module.exports = getDevConfig(options)
