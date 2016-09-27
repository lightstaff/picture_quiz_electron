/**
 * Created by Lightstaff on 2016/09/23.
 */

import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  headerText: '',
});

const actions = handleActions({
  SET_HEADER_TEXT: (state, action) => state.update('headerText', () => action.payload),
}, initialState);

export default actions;
