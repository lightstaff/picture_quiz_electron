/**
 * Created by Lightstaff on 2016/09/23.
 */

import 'babel-polyfill';

import webpack from 'webpack';

import config from './webpack.config.production';

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats);
});
