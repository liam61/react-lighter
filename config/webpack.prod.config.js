// const webpack = require('webpack')
const merge = require('webpack-merge')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const options = require('./options')
const getBaseConfig = require('./webpack.base.config')

process.env.NODE_ENV = 'production'

function getProdConfig(opts) {
  return merge(getBaseConfig(opts), {
    plugins: [
      new ParallelUglifyPlugin({
        sourceMap: true,
        workerCount: 4, // 开启几个子进程去并发的执行压缩
        uglifyJS: {
          output: {
            beautify: false, // 不需要格式化
            comments: false // 保留注释
          },
          compress: {
            warnings: false, // Uglifyjs 删除没有代码时，不输出警告
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      })
    ]
  })
}

module.exports = getProdConfig(options)
