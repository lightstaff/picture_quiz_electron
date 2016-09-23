/**
 * Created by Lightstaff on 2016/09/22.
 */

import { createAction } from 'redux-actions';

export const REQUEST_FETCH_LOCALFILES = 'REQUEST_FETCH_LOCALFILES';
export const SUCCESS_FETCH_LOCALFILES = 'SUCCESS_FETCH_LOCALFILES';
export const FAILURE_FETCH_LOCALFILES = 'FAILURE_FETCH_LOCALFILES';

export const requestFetchLocalFiles = createAction(REQUEST_FETCH_LOCALFILES, (folder, queryExt) => ({
  folder,
  queryExt,
}));
export const successFetchLocalFiles = createAction(SUCCESS_FETCH_LOCALFILES, results => results);
export const failureFetchLocalFiles = createAction(FAILURE_FETCH_LOCALFILES);
