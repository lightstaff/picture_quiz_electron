/**
 * Created by Lightstaff on 2016/09/22.
 */

import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  error: undefined,
});

export default handleActions({
  ADD_ERROR: (state, action) => state.update('error', () => action.payload),
  REMOVE_ERROR: () => initialState,
}, initialState);
