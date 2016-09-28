/**
 * Created by Lightstaff on 2016/09/22.
 */

import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  error: null,
  hasError: false,
});

const actions = handleActions({
  ADD_ERROR: (state, action) => state.update('error', () => action.payload)
    .update('hasError', () => true),
  REMOVE_ERROR: () => initialState,
}, initialState);

export default actions;

