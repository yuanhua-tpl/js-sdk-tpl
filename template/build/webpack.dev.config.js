const CONFIG = require('../config/')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AmendAsyncPlugin = require('./amend')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: CONFIG.entry,
  mode: 'development',
  output: {
    path: CONFIG.filePath.dist,
    filename: "[name].js",
    chunkFilename: "[name].js",
    // publicPath: '/dist/',
    library: 'thanos',
    libraryTarget: 'umd'
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new AmendAsyncPlugin(),
    new CleanWebpackPlugin(['dist']),
  ]
};