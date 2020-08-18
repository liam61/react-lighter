const merge = require('webpack-merge').default
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const getBaseConfig = require('./webpack.base.config')
const options = require('./options')

function getProdConfig(opts) {
  return merge(getBaseConfig(opts), {
    plugins: [
      new ParallelUglifyPlugin({
        sourceMap: true,
        workerCount: 4,
        uglifyES: {
          output: {
            beautify: false, // 不需要格式化
            comments: false,
          },
          compress: {
            warnings: false, // Uglifyjs 删除没有代码时，不输出警告
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          safe: true, // 避免 cssnano 重新计算 z-index
          autoprefixer: false, // 关闭 autoprefixer 功能 使用 postcss 的 autoprefixer 功能
        },
        canPrint: true,
      }),
    ],
  })
}

module.exports = getProdConfig(options)
