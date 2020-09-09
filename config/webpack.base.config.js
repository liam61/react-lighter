const webpack = require('webpack')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurifycssWebpack = require('purifycss-webpack')
const PurgecssPlugin = require('purgecss-webpack-plugin') // 去除没引用到的样式，必须在 html-webpack-plugin 后引用
const glob = require('glob-all')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HappyPack = require('happypack')
const createMobxTransformer = require('./createMobxTransformer')
const { resolve } = require('./utils')

const happyThreadPool = HappyPack.ThreadPool({ size: Math.min(os.cpus().length, 4) })

module.exports = ({
  entryDir,
  entryFile,
  outputDir,
  templateFile,
  templateTitle,
  cssPath,
  purifycssFile,
  useCssExtract,
  assetsPath,
  dllFiles,
}) => {
  const env = process.env.NODE_ENV
  const isDev = env === 'development'
  const dllWebpack = require(resolve(`${outputDir}/${dllFiles[1]}`))
  const assetOptions = {
    limit: 10000,
    name: `${assetsPath}/[name].[ext]`,
    publicPath: '../',
  }
  const cssLoaders = [
    useCssExtract ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'postcss-loader',
  ]

  const plugins = [
    new HtmlWebpackPlugin({
      template: resolve(templateFile),
      filename: 'index.html',
      title: templateTitle,
      minify: isDev
        ? null
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
          },
      favicon: resolve(entryDir, 'assets/images/favicon.jpg'),
    }),
    new webpack.DllReferencePlugin({
      manifest: dllWebpack,
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve(`${outputDir}/*.dll.js`),
      includeSourcemap: false,
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: `${cssPath}/[name].[hash:8].css`,
    }),
    new PurgecssPlugin({
      paths: glob.sync(
        purifycssFile.map(url => resolve(url)),
        { nodir: true },
      ),
    }),
    new HappyPack({
      // loader 中指定的 id
      id: 'jspack',
      // 实际匹配处理的 loader
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'csspack',
      use: [
        ...cssLoaders,
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
      threadPool: happyThreadPool,
    }),
    !isDev &&
      new CleanWebpackPlugin([resolve(outputDir)], {
        root: process.cwd(),
        exclude: dllFiles,
      }),
  ]

  const baseConfig = {
    entry: resolve(entryFile),
    output: {
      filename: '[name].[hash:8].js',
      path: resolve(outputDir),
    },
    mode: env,
    devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'happypack/loader?id=jspack',
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            'happypack/loader?id=jspack',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
                getCustomTransformers: () => ({
                  before: [createMobxTransformer()],
                }),
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(css|less)$/,
          loader: 'happypack/loader?id=csspack',
        },
        {
          test: /\.scss$/,
          use: [
            ...cssLoaders,
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  javascriptEnabled: true,
                  sourceMap: true,
                },
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: Object.assign({}, assetOptions, {
            minetype: 'image/svg+xml',
          }),
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader',
          options: assetOptions,
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: assetOptions,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [resolve(entryDir), resolve('node_modules')],
      alias: {
        '@': resolve(entryDir),
        mobx: resolve('node_modules/mobx/lib/mobx.es6.js'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          // 重复引用的三方库
          vendor: {
            name: 'vendor',
            test: /node_modules/,
            chunks: 'initial',
            priority: 10,
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
  }

  return Object.assign(baseConfig, { plugins: plugins.filter(Boolean) })
}
