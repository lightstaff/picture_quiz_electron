/**
 * Created by Lightstaff on 2016/09/23.
 */

import { createAction } from 'redux-actions';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_HEADER_TEXT = 'SET_HEADER_TEXT';
export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const SET_QUIZ_VIEW = 'SET_QUIZ_VIEW';

export const startLoading = createAction(START_LOADING);
export const stopLoading = createAction(STOP_LOADING);
export const setHeaderText = createAction(SET_HEADER_TEXT, text => text);
export const startGame = createAction(START_GAME);
export const stopGame = createAction(STOP_GAME);
export const setQuizView = createAction(SET_QUIZ_VIEW, index => index);
