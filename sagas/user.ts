import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../store/constants/user';
import { Action } from '../store/reducers/interfaces';
import { signupAPI } from './api/user';

function* signup(action: Action) {
  try {
    const result = yield call(signupAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch(error) {
    console.error(error);
    yield put({ type: SIGN_UP_FAILURE, error: error.message });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
  ]);
}