const CleanWebpackPlugin = require('clean-webpack-plugin')
const AmendAsyncPlugin = require('./amend')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CONFIG = require('../config/')

module.exports = {
  entry: CONFIG.entry,
  mode: 'production',
  output: {
    path: CONFIG.filePath.dist,
    filename: "[name].js",
    chunkFilename: "[name].js",
    // publicPath: '/dist/',
    library: '{{name}}',
    libraryTarget: 'umd'
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new AmendAsyncPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          pure_funcs: ['console.log']
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new CleanWebpackPlugin(['dist']),
  ]
};