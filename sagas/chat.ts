import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { LOAD_CHATROOM_FAILURE, LOAD_CHATROOM_REQUEST, LOAD_CHATROOM_SUCCESS } from '../store/constants/chat';
import { Action } from '../store/reducers/interfaces';
import { loadChatRoomAPI } from './api/chat';
import { addFriendAPI } from './api/user';

function* loadChatRoom(action: Action) {
  try {
    const result = yield call(loadChatRoomAPI, action.data);
    console.log('result', result);
    // yield call(addFriendAPI, result);
    // yield put({ type: LOAD_CHATROOM_SUCCESS, });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOAD_CHATROOM_FAILURE,
      error: error.message
    });
  }
}

function* watchLoadChatRoom() {
  yield takeLatest(LOAD_CHATROOM_REQUEST, loadChatRoom);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadChatRoom),
  ]);
}