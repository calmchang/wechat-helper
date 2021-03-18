const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let otherPlugins = [];
let cssLoader = [];
if (process.env.npm_config_report) {
  otherPlugins.push(new BundleAnalyzerPlugin());
}

const devMode = process.env.NODE_ENV !== 'production';
console.log(`打包环境:${process.env.NODE_ENV}`);

if (!devMode) {
  otherPlugins.push(new webpack.optimize.ModuleConcatenationPlugin());
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
      library: 'wechatHelper',
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
                        // ie: '11',
                      },
                    },
                  ],
                ],
                plugins: [
                  ['@babel/plugin-transform-runtime', { corejs: 3 }],
                  // '@babel/plugin-proposal-optional-chaining',
                  // '@babel/plugin-proposal-nullish-coalescing-operator',
                  // ['@babel/plugin-proposal-decorators', { legacy: true }],
                  // ['@babel/plugin-proposal-private-methods', { loose: true }],
                  // ['@babel/plugin-proposal-class-properties', { loose: true }],
                ],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: devMode ? false : true, // 是否压缩js
      // minimizer: [
      //   new UglifyJsPlugin({
      //     sourceMap: true,
      //     parallel: true,
      //     cache: true,
      //     // minify(file, sourceMap) {
      //     //   let uglifyJsOptions = {};
      //     //   if (sourceMap) {
      //     //     uglifyJsOptions.sourceMap = {
      //     //       content: sourceMap,
      //     //     };
      //     //   }
      //     //   return require('terser').minify(file, uglifyJsOptions);
      //     // },
      //   }),
      // ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...otherPlugins,
      new webpack.SourceMapDevToolPlugin({
        filename: 'sourcemap/[file].map',
        publicPath:'',
        fileContext: 'js',
      }),

    ],
  };
};
