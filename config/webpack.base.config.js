/**
 * Webpack base configuration for both server and client.
 */
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);

const config = {
  mode: process.env.NODE_ENV,

  devtool: isProd ? false : 'cheap-module-source-map',

  context: resolve('../src'),

  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },

  optimization: isProd
    ? {
      minimizer: [
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
      },
    } : {

    },

  module: {
    rules: [
      require('./vue-loader.config'),
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },

  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false,
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('../src'),
      'masonry': 'masonry-layout',
      'isotope': 'isotope-layout',
    },
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
