/**
 * Created by Lightstaff on 2016/09/22.
 */

import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import readImgFile from '../api/readImgFiles';
import makePdfData from '../api/makePdfData';
import {
  REQUEST_FETCH_IMGS,
  successFetchImgs,
  failureFetchImgs,
} from '../actions/imgs';
import {
  REQUEST_FETCH_PDF,
  successFetchPdf,
  failureFetchPdf,
} from '../actions/pdf';
import {
  startLoading,
  stopLoading
} from '../actions/app';
import { addError } from '../actions/errors';

const getImgsPath = state => state.imgs.get('path');
const getPdfPath = state => state.pdf.get('path');

function* handleRequestFetchImgs() {
  try {
    yield put(startLoading());
    const path = yield select(getImgsPath);
    const payload = yield call(readImgFile, path);
    yield put(successFetchImgs(payload));
  } catch (err) {
    yield put(failureFetchImgs());
    yield put(addError(err));
  } finally {
    yield put(stopLoading());
  }
}

function* handleRequestFetchPdf() {
  try {
    yield put(startLoading());
    const path = yield select(getPdfPath);
    const payload = yield call(makePdfData, path);
    yield put(successFetchPdf(payload));
  } catch (err) {
    yield put(failureFetchPdf());
    yield put(addError(err));
  } finally {
    yield put(stopLoading());
  }
}

function* requestFetchImgsAsync() {
  yield* takeEvery(REQUEST_FETCH_IMGS, handleRequestFetchImgs);
}

function* requestFetchPdfAsync() {
  yield* takeEvery(REQUEST_FETCH_PDF, handleRequestFetchPdf);
}

export default function* rootSaga() {
  yield [
    requestFetchImgsAsync(),
    requestFetchPdfAsync(),
  ];
}
