/**
 * Created by Lightstaff on 2016/09/22.
 */

import path from 'path';

export default {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: '[path][name].[ext]?[hash]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]?[hash]',
        },
      },
    ],
  },

  postcss() {
    return [
      require('autoprefixer'),
    ];
  },
};
