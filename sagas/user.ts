import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { ADD_FRIEND_FAILURE, ADD_FRIEND_REQUEST, ADD_FRIEND_SUCCESS, EDIT_PROFILE_FAILURE, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SOCIAL_LOG_IN_FAILURE, SOCIAL_LOG_IN_REQUEST, SOCIAL_LOG_IN_SUCCESS } from '../store/constants/user';
import { Action } from '../store/reducers/interfaces';
import { signupAPI, loadMyInfoAPI, socialLoginAPI, loginAPI, logoutAPI, registerNicknameAPI, registerUserAPI, addFriendAPI, searchFriendAPI, editProfileAPI, registerDefaultPhotoURLAPI } from './api/user';

function* signup(action: Action) {
  try {
    yield call(signupAPI, action.data);
    yield call(registerNicknameAPI, action.data);
    yield call(registerDefaultPhotoURLAPI, action.data);
    yield call(registerUserAPI, action.data);
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
    yield put({ type: LOG_IN_SUCCESS });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.message
    });
  }
}

function* loadMyInfo(action: Action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
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

function* addFriend(action: Action) {
  try {
    const result = yield call(searchFriendAPI, action.data);
    if(!result) {
      return yield put({
        type: ADD_FRIEND_FAILURE,
        error: true,
      });
    }
    const me = yield call(addFriendAPI, result);
    console.log('me', me);
    yield put({ type: ADD_FRIEND_SUCCESS, data: me });
  } catch(error) {
    console.error(error);
    yield put({
      type: ADD_FRIEND_FAILURE,
      error: error.message
    });
  }
}

function* editProfile(action: Action) {
  try {
    const result = yield call(editProfileAPI, action.data);
    console.log('editProfile', result);
    yield put({
      type: EDIT_PROFILE_SUCCESS, 
      data: result,
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: EDIT_PROFILE_FAILURE,
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

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchAddFriend() {
  yield takeLatest(ADD_FRIEND_REQUEST, addFriend);
}

function* watchEditProfile() {
  yield takeLatest(EDIT_PROFILE_REQUEST, editProfile);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchSocialLogin),
    fork(watchLogin),
    fork(watchLoadMyInfo),
    fork(watchLogout),
    fork(watchAddFriend),
    fork(watchEditProfile),
  ]);
}