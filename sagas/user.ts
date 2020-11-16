import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SOCIAL_LOG_IN_FAILURE, SOCIAL_LOG_IN_REQUEST, SOCIAL_LOG_IN_SUCCESS } from '../store/constants/user';
import { Action } from '../store/reducers/interfaces';
import { signupAPI, socialLoginAPI, loginAPI, logoutAPI } from './api/user';

function* signup(action: Action) {
  try {
    yield call(signupAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch(error) {
    console.error(error);
    yield put({ type: SIGN_UP_FAILURE, error: error.message });
  }
}

function* socialLogin(action: Action) {
  try {
    const result = yield call(socialLoginAPI, action.data);
    console.log(result);
    yield put({ type: SOCIAL_LOG_IN_SUCCESS });
  } catch(error) {
    console.error(error);
    yield put({ type: SOCIAL_LOG_IN_FAILURE, error: error.message });
  }
}

function* login(action: Action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.user
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.message
    });
  }
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.message
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchSocialLogin() {
  yield takeLatest(SOCIAL_LOG_IN_REQUEST, socialLogin);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchSocialLogin),
    fork(watchLogin),
    fork(watchLogout),
  ]);
}