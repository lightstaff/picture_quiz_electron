/**
 * Created by Lightstaff on 2016/09/22.
 */

import { fork, take, put, call } from 'redux-saga/effects';

import readLocalFiles from '../api/readLocalFiles';
import {
  REQUEST_FETCH_LOCALFILES,
  successFetchLocalFiles,
  failureFetchLocalFiles,
} from '../actions/fetchLocalFiles';
import { addError } from '../actions/errors';

function* handleRequestFetchLocalFiles() {
  while (true) {
    const action = yield take(REQUEST_FETCH_LOCALFILES);
    try {
      const payload = yield call(readLocalFiles, action.payload);
      yield put(successFetchLocalFiles(payload));
    } catch (err) {
      yield put(failureFetchLocalFiles());
      yield put(addError(err));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestFetchLocalFiles);
}
