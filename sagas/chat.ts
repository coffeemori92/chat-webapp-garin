import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { LOAD_CHATROOM_FAILURE, LOAD_CHATROOM_REQUEST, LOAD_CHATROOM_SUCCESS, SEARCH_CHATROOM_FAILURE, SEARCH_CHATROOM_REQUEST, SEARCH_CHATROOM_SUCCESS } from '../store/constants/chat';
import { Action } from '../store/reducers/interfaces';
import { loadChatRoomAPI, makeChatRoomAPI, searchChatRoomAPI, searchFriendChatRoomsAPI } from './api/chat';

function* searchChatRoom(action: Action) {
  try {
    const myFriendChatRooms = yield call(searchFriendChatRoomsAPI, action.data);
    if(!myFriendChatRooms) {
      const chatRoomId = yield call(makeChatRoomAPI, action.data);
      yield put({ type: SEARCH_CHATROOM_SUCCESS, data: chatRoomId});
    } else {
      const chatRoomId = yield call(searchChatRoomAPI, myFriendChatRooms);
      if(!chatRoomId) {
        const chatRoomId = yield call(makeChatRoomAPI, action.data);
        yield put({ type: SEARCH_CHATROOM_SUCCESS, data: chatRoomId});
      } else {
        yield put({ type: SEARCH_CHATROOM_SUCCESS, data: chatRoomId});
      }
    }
  } catch(error) {
    yield put({
      type: SEARCH_CHATROOM_FAILURE,
      error: error.message
    });
  }
}

function* loadChatRoom(action: Action) {
  try {
    const result = yield call(loadChatRoomAPI, action.data);
    console.log('result', result);
    if(result) {
      yield put({ type: LOAD_CHATROOM_SUCCESS, data: result});
    } else {
      yield put({
        type: LOAD_CHATROOM_FAILURE,
        error: 'ERR001',
      });
    }
  } catch(error) {
    yield put({
      type: LOAD_CHATROOM_FAILURE,
      error: error.message
    });
  }
}

function* watchChatRoomSearch() {
  yield takeLatest(SEARCH_CHATROOM_REQUEST, searchChatRoom);
}

function* watchChatLoadChatRoom() {
  yield takeLatest(LOAD_CHATROOM_REQUEST, loadChatRoom);
}

export default function* userSaga() {
  yield all([
    fork(watchChatRoomSearch),
    fork(watchChatLoadChatRoom),
  ]);
}