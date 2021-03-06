const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: [
    // 'webpack-hot-middleware/client',
    // 'webpack/hot/dev-server',
    // 'webpack/hot/only-dev-server',
    path.join(__dirname, '/client/src/app/app.js'),
  ],
  // Server Configuration options
  devServer: {
    contentBase: 'client/src/www', // Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    // path: buildPath, // Path of output file
    path: path.resolve(__dirname, 'client/src/www'),
    publicPath: '/',
    filename: 'app.js',
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // Enables Hot Modules Replacement
    // new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'client/src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;
