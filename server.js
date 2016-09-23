/**
 * Created by Lightstaff on 2016/09/22.
 */

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.development';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(port, 'localhost', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
