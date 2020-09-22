const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const smp = new SpeedMeasurePlugin();

let otherPlugins = [];
let cssLoader = [];
if (process.env.npm_config_report) {
  otherPlugins.push(new BundleAnalyzerPlugin());
}

const devMode = process.env.NODE_ENV !== 'production';
console.log(`打包环境:${process.env.NODE_ENV}`);
const assetsPublicPath = '';

if (!devMode) {
  otherPlugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  cssLoader.push('postcss-loader');
}

module.exports = function ({ packageDist }) {
  return {
    entry: {
      index: [
        // '@babel/polyfill',
        path.resolve(__dirname, 'src/index.js'),
      ],
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      path: path.join(__dirname, packageDist),
      publicPath: '',
      library: 'WechatHelper',
      libraryTarget: 'umd', // 'var', // 'commonjs2',  'umd',
      // libraryTarget: 'var', //  'umd',
    },

    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-react',
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        chrome: '40',
                        ie: '11',
                      },
                    },
                  ],
                ],
                plugins: [
                  ['@babel/plugin-transform-runtime', { corejs: 3 }],
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  ['@babel/plugin-proposal-private-methods', { loose: true }],
                  ['@babel/plugin-proposal-class-properties', { loose: true }],
                  // ["import", {
                  //         style: true,//"css",
                  //         libraryName: "antd" ,
                  //         // "libraryDirectory":"lib"
                  // }]
                ],
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'assets/[name].[hash:8].[ext]',
            options: {
              publicPath: assetsPublicPath,
            },
          },
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/font/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: assetsPublicPath,
              },
            },
            {
              loader: 'css-loader',
              options: { importLoaders: 2, modules: { localIdentName: '[local]--[hash:base64:5]' } },
            },
            ...cssLoader,
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: assetsPublicPath,
              },
            },
            'css-loader',
            ...cssLoader,
          ],
        },
      ],
    },
    optimization: {
      minimize: devMode ? false : true, // 是否压缩js
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true,
          cache: true,
          minify(file, sourceMap) {
            let uglifyJsOptions = {};
            if (sourceMap) {
              uglifyJsOptions.sourceMap = {
                content: sourceMap,
              };
            }
            return require('terser').minify(file, uglifyJsOptions);
          },
        }),
        new OptimizeCSSAssetsPlugin({}), // 压缩css
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 10000,
        maxSize: 0,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          default: {
            minChunks: 5,
            priority: 1,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      // new HardSourceWebpackPlugin(),
      new webpack.DefinePlugin({
        CODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SERVER_ENV: JSON.stringify(process.env.SERVER_ENV),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      ...otherPlugins,
      new webpack.SourceMapDevToolPlugin({
        filename: 'sourcemap/[file].map',
        publicPath: devMode ? '' : 'http://pm.test.com/dist/public/',
        fileContext: 'js',
      }),
    ],
  };
};
