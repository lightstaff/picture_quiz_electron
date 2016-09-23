/**
 * Created by Lightstaff on 2016/09/22.
 */

import 'babel-polyfill';

import minimist from 'minimist';
import webpack from 'webpack';
import packager from 'electron-packager';
import del from 'del';

import eConfig from './webpack.config.electron';
import pConfig from './webpack.config.production';

const os = require('os');
const argv = minimist(process.argv.slice(2));
const exec = require('child_process').exec;
const pkg = require('./package.json');

const deps = Object.keys(pkg.dependencies);
const devDeps = Object.keys(pkg.devDependencies);

const appName = argv.name || argv.n || pkg.productName;
const shouldUseAsar = argv.asar || argv.a || false;

const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  ignore: [
    '^/test($|/)',
    '^/release($|/)',
    '^/main.development.js',
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
    .concat(
      deps.filter(name => !eConfig.externals.includes(name))
        .map(name => `/node_modules/${name}($|/)`)
    ),
};

const icon = argv.icon || argv.i || 'app/app';

if (icon) {
  DEFAULT_OPTS.icon = icon;
}

const version = argv.version || argv.v;

if (version) {
  DEFAULT_OPTS.version = version;
  startPack();
} else {
  exec('npm list electron --dev', (err, stdout) => {
    if (err) {
      DEFAULT_OPTS.version = '1.2.0';
    } else {
      DEFAULT_OPTS.version = stdout.split('electron@')[1].replace(/\s/g, '');
    }

    startPack();
  });
}

function build(cfg) {
  return new Promise((resolve, reject) => {
    webpack(cfg, (err, stats) => {
      if (err) return reject(err);
      return resolve(stats);
    });
  });
}

async function startPack() {
  console.log('start pack...');

  try {
    await build(eConfig);
    await build(pConfig);
    await del('release');

    const archs = ['ia32', 'x64'];
    const platforms = ['win32'];

    platforms.forEach((plat) => {
      archs.forEach((arch) => {
        pack(plat, arch, log(plat, arch));
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function pack(plat, arch, cb) {
  const iconObj = {
    icon: DEFAULT_OPTS.icon + (() => '.ico')()
  };

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
    platform: plat,
    arch,
    prune: true,
    'app-version': pkg.version || DEFAULT_OPTS.version,
    out: `release/${plat}-${arch}`
  });

  packager(opts, cb);
}


function log(plat, arch) {
  return (err, filepath) => {
    if (err) return console.error(err);
    console.log(`${plat}-${arch} finished!`);
  };
}
