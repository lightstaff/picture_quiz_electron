/**
 * Created by Lightstaff on 2016/09/23.
 */

import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  isLoading: false,
  headerText: '',
  isStartGame: false,
  quizViewIndex: 0,
});

const actions = handleActions({
  START_LOADING: state => state.update('isLoading', () => true),
  STOP_LOADING: state => state.update('isLoading', () => false),
  SET_HEADER_TEXT: (state, action) => state.update('headerText', () => action.payload),
  START_GAME: state => state.update('isStartGame', () => true),
  STOP_GAME: state => state.update('isStartGame', () => false),
  SET_QUIZ_VIEW: (state, action) => state.update('quizViewIndex', () => action.payload),
}, initialState);

export default actions;
