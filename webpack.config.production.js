/**
 * Created by Lightstaff on 2016/09/22.
 */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';

import baseConfig from './webpack.config.base';

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    './app/index',
  ],

  output: {
    publicPath: '../dist/',
  },

  module: {
    loaders: [
      {
        test: /\.global\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'postcss-loader',
        ),
      },
      {
        test: /^((?!\.global).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: false,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:3]',
            minimize: true,
          })}`,
          'postcss-loader',
        ),
      },
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __DEV__: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],

  target: 'electron-renderer',
});
