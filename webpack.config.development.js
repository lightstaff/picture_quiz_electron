/**
 * Created by Lightstaff on 2016/09/22.
 */

import webpack from 'webpack';
import merge from 'webpack-merge';

import baseConfig from './webpack.config.base';

const port = process.env.PORT || 3000;

export default merge(baseConfig, {
  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`,
  },

  module: {
    loaders: [
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
        ],
      },
      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: true,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:3]',
            minimize: false,
          })}`,
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEV__: true,
    }),
    new webpack.NoErrorsPlugin(),
  ],

  target: 'electron-renderer',
});
