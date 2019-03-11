var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: {
    index: './jobTrends/static/js/index.js',
  },

  output: {
      path: path.resolve('./jobTrends/static/bundles/'),
      filename: '[name].js',
      publicPath: '/',
  },

  plugins: [
    new BundleTracker({filename: './jobTrends/webpack-stats.json'}),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['es2015', 'react'] }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }

};