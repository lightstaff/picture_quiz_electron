/**
 * Created by Lightstaff on 2016/09/22.
 */

import immutable, { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  folder: '',
  queryExt: '',
  items: new List(),
});

export default handleActions({
  REQUEST_FETCH_LOCALFILES: (state, action) => state.update('folder', () => action.payload.folder)
    .update('queryExt', () => action.payload.queryExt)
    .update('items', () => new List()),
  SUCCESS_FETCH_LOCALFILES: (state, action) => state.update('items', () => action.payload ?
    immutable.fromJS(action.payload) : new List()),
  FAILURE_FETCH_LOCALFILES: () => initialState,
}, initialState);
