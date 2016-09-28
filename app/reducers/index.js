/**
 * Created by Lightstaff on 2016/09/22.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app';
import imgs from './imgs';
import pdf from './pdf';
import panels from './panels';
import errors from './errors';

const rootReducer = combineReducers({
  app,
  imgs,
  pdf,
  panels,
  errors,
  routing: routerReducer,
});

export default rootReducer;
