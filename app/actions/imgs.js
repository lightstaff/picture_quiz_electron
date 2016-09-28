/**
 * Created by Lightstaff on 2016/09/22.
 */

import { createAction } from 'redux-actions';

export const SET_IMGS_PATH = 'SET_IMGS_PATH';
export const REQUEST_FETCH_IMGS = 'REQUEST_FETCH_IMGS';
export const SUCCESS_FETCH_IMGS = 'SUCCESS_FETCH_IMGS';
export const FAILURE_FETCH_IMGS = 'FAILURE_FETCH_IMGS';
export const PREV_IMG = 'PREV_IMG';
export const NEXT_IMG = 'NEXT_IMG';
export const RESET_IMGS = 'RESET_IMGS';

export const setImgsPath = createAction(SET_IMGS_PATH, path => path);
export const requestFetchImgs = createAction(REQUEST_FETCH_IMGS);
export const successFetchImgs = createAction(SUCCESS_FETCH_IMGS, results => results);
export const failureFetchImgs = createAction(FAILURE_FETCH_IMGS);
export const prevImg = createAction(PREV_IMG);
export const nextImg = createAction(NEXT_IMG);
export const resetImgs = createAction(RESET_IMGS);
