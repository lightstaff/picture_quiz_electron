/**
 * Created by Lightstaff on 2016/09/27.
 */

import { createAction } from 'redux-actions';

export const SET_PDF_PATH = 'SET_PDF_PATH';
export const REQUEST_FETCH_PDF = 'REQUEST_FETCH_PDF';
export const SUCCESS_FETCH_PDF = 'SUCCESS_FETCH_PDF';
export const FAILURE_FETCH_PDF = 'FAILURE_FETCH_PDF';
export const PREV_PDF = 'PREV_PDF';
export const NEXT_PDF = 'NEXT_PDF';
export const RESET_PDF = 'RESET_PDF';

export const setPdfPath = createAction(SET_PDF_PATH, path => path);
export const requestFetchPdf = createAction(REQUEST_FETCH_PDF);
export const successFetchPdf = createAction(SUCCESS_FETCH_PDF, result => result);
export const failureFetchPdf = createAction(FAILURE_FETCH_PDF);
export const prevPdf = createAction(PREV_PDF);
export const nextPdf = createAction(NEXT_PDF);
export const resetPdf = createAction(RESET_PDF);
