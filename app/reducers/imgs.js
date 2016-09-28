/**
 * Created by Lightstaff on 2016/09/22.
 */

import immutable, { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  path: '',
  items: new List(),
  indexes: 0,
  currentIndex: 0,
});

const actions = handleActions({
  SET_IMGS_PATH: (state, action) => state.update('path', () => action.payload)
    .update('items', () => new List()),
  REQUEST_FETCH_IMGS: state => state,
  SUCCESS_FETCH_IMGS: (state, action) => state.update('items', () => action.payload ?
    immutable.fromJS(action.payload) : new List())
    .update('indexes', () => action.payload ? action.payload.length - 1 : 0)
    .update('currentIndex', () => 0),
  FAILURE_FETCH_IMGS: () => initialState,
  NEXT_IMG: state => state.update('currentIndex', currentIndex => currentIndex < state.get('indexes') ? currentIndex + 1 : currentIndex),
  PREV_IMG: state => state.update('currentIndex', currentIndex => 0 < currentIndex ? currentIndex - 1 : currentIndex),
  RESET_IMGS: () => initialState,
}, initialState);

export default actions;
