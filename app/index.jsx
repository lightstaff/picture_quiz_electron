/**
 * Created by Lightstaff on 2016/09/22.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';
import AppRouter from './AppRouter.jsx';

import './app.global.css';

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('root')
);
