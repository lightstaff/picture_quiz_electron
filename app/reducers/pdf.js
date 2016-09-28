/**
 * Created by Lightstaff on 2016/09/27.
 */

import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new Map({
  path: '',
  pdfDocument: null,
  pages: 0,
  currentPage: 0,
});

const actions = handleActions({
  SET_PDF_PATH: (state, action) => state.update('path', () => action.payload)
    .update('pdfDocument', () => null),
  REQUEST_FETCH_PDF: state => state,
  SUCCESS_FETCH_PDF: (state, action) => state.update('pdfDocument', () => action.payload)
    .update('pages', () => action.payload.numPages)
    .update('currentPage', () => 1),
  FAILURE_FETCH_PDF: () => initialState,
  NEXT_PDF: state => state.update('currentPage', currentPage => currentPage < state.get('pages') ? currentPage + 1 : currentPage),
  PREV_PDF: state => state.update('currentPage', currentPage => 1 < currentPage ? currentPage - 1 : currentPage),
  RESET_PDF: () => initialState,
}, initialState);

export default actions;
