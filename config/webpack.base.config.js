const webpack = require('webpack')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
  // author,
  cssPath,
  purifycssFile,
  useCssExtract,
  assetsPath,
  copyConfig,
  dllFiles,
}) => {
  const env = process.env.NODE_ENV
  const isDevMode = env === 'development'
  const dllWebpack = require(resolve(`${outputDir}/react.manifest.json`))
  const assetOptions = {
    limit: 10000,
    name: `${assetsPath}/[name].[ext]`,
    publicPath: '../',
  }

  const plugins = [
    new HtmlWebpackPlugin({
      template: resolve(templateFile),
      filename: 'index.html',
      title: templateTitle,
      minify: isDevMode
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
      id: 'tspack', // loader 中指定的 id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的 loader
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new HappyPack({
      id: 'jspack',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new HappyPack({
      id: 'csspack',
      use: [
        useCssExtract ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              javascriptEnabled: true,
              includePaths: [resolve(entryDir, 'common')],
              sourceMap: true,
            },
          },
        },
        {
          loader: 'sass-resources-loader', // 全局共用 scss 样式
          options: {
            sourceMap: true,
            resources: resolve(entryDir, 'assets/css/global_vars.scss'),
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ]

  if (!isDevMode) {
    plugins.push(
      new CleanWebpackPlugin([resolve(outputDir)], {
        root: process.cwd(),
        exclude: dllFiles,
      }),
    )
  }

  if (copyConfig.needsCopy) {
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: resolve(copyConfig.fromPath),
          to: resolve(copyConfig.toPath), // 找到 dist 目录下的 docs，并放进去
        },
      ]),
    )
  }

  const baseConfig = {
    entry: resolve(entryFile),
    output: {
      filename: '[name].[hash:8].js',
      path: resolve(outputDir),
    },
    mode: env,
    devtool: isDevMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'happypack/loader?id=jspack',
          include: resolve(entryDir),
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            'happypack/loader?id=tspack',
            {
              loader: 'awesome-typescript-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
                getCustomTransformers: () => ({
                  before: [createMobxTransformer()],
                }),
              },
            },
          ],
          include: resolve(entryDir),
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [useCssExtract ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.less$/,
          use: [
            useCssExtract ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          loader: 'happypack/loader?id=csspack',
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
          loader: 'url-loader',
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
          vendor: {
            // 重复引用的三方库
            name: 'vendor',
            test: /node_modules/,
            chunks: 'initial',
            priority: 10,
            enforce: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
  }

  return Object.assign(baseConfig, { plugins })
}
