const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const { resolve } = require('./utils')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // 根据系统的内核数量指定线程池个数

module.exports = ({
  entryFile,
  outputPath,
  templateFile,
  templateTitle,
  jsPath = 'src',
  cssPath,
  needsCssInHtml,
  assetsPath,
  copyConfig,
  dllFiles
}) => {
  const env = process.env.NODE_ENV
  const dllWebpack = require(resolve(`${outputPath}/react.manifest.json`))
  const plugins = [
    new HtmlWebpackPlugin({
      template: resolve(templateFile),
      filename: 'index.html',
      title: templateTitle,
      minify:
        env === 'development'
          ? null
          : {
            removeAttributeQuotes: true,
            collapseWhitespace: true
          }
      // favicon: './favicon.ico',
    }),
    new webpack.BannerPlugin('created by lawler'),
    new ExtractTextWebpackPlugin({
      filename: `${cssPath}/index.[hash:8].css`,
      disable: needsCssInHtml // 只有为 false 时才会去除无用 css
    }),
    new webpack.DllReferencePlugin({
      manifest: dllWebpack
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve(`${outputPath}/*.dll.js`),
      includeSourcemap: false
    }),
    new CleanWebpackPlugin([resolve(outputPath)], {
      root: process.cwd(),
      exclude: dllFiles
    }),
    new HappyPack({
      id: 'babel', // 上面 loader? 后面指定的 id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的 loader
      threadPool: happyThreadPool,
      verbose: true
    })
  ]

  if (copyConfig && copyConfig.fromPath && copyConfig.toPath) {
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: resolve(copyConfig.fromPath),
          to: resolve(copyConfig.toPath) // 找到 dist 目录下的 docs，并放进去
        }
      ])
    )
  }

  const baseConfig = {
    entry: ['@babel/polyfill', resolve(entryFile)],
    output: {
      filename: '[name].[hash:8].js',
      path: resolve(outputPath) // 输出路径，必须是绝对路径
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: {
            loader: 'eslint-loader'
          },
          exclude: /node_modules/
        },
        {
          test: /(\.js|\.jsx)$/,
          use: 'happypack/loader?id=babel',
          exclude: /node_modules/,
          include: resolve(jsPath)
        },
        {
          test: /\.css$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader', // 如果该插件不生效，则用 style-loader 处理
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.less$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                  sourceMap: true
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                  sourceMap: true
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10240,
            minetype: 'image/svg+xml',
            name: `${assetsPath}/[name].[ext]`,
            publicPath: '../'
          }
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: `${assetsPath}/[name].[ext]`,
            publicPath: '../'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: `${assetsPath}/[name].[ext]`,
            publicPath: '../'
          }
        }
      ]
      // 'noParse': /jquery/
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.less', 'scss'],
      modules: [resolve(jsPath), resolve('node_modules')],
      alias: {}
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            // 将第三方模块提取出来
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10, // 优先
            enforce: true
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    }
  }

  baseConfig.plugins = plugins
  return baseConfig
}
