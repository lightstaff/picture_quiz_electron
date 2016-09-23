/**
 * Created by Lightstaff on 2016/09/22.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app';
import files from './files';
import panels from './panels';
import errors from './errors';

const rootReducer = combineReducers({
  app,
  files,
  panels,
  errors,
  routing: routerReducer,
});

export default rootReducer;
