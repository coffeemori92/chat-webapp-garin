import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { LOAD_CHATROOMS_FAILURE, LOAD_CHATROOMS_REQUEST, LOAD_CHATROOMS_SUCCESS, LOAD_CHATROOM_FAILURE, LOAD_CHATROOM_REQUEST, LOAD_CHATROOM_SUCCESS, SEARCH_CHATROOM_FAILURE, SEARCH_CHATROOM_REQUEST, SEARCH_CHATROOM_SUCCESS, SEARCH_CHATS_FAILURE, SEARCH_CHATS_REQUEST, SEARCH_CHATS_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../store/constants/chat';
import { Action } from '../store/reducers/interfaces';
import { getFriendEmailByChatrooms, getRecentChatAPI, initChatsAPI, loadChatRoomAPI, makeChatRoomAPI, searchChatRoomAPI, searchChatsAPI, searchFriendChatRoomsAPI, searchMyChatRoomsAPI, sendMessageAPI } from './api/chat';
import { searchFriendAPI } from './api/user';

function* searchChatRoom(action: Action) {
  try {
    const myFriendChatRooms = yield call(searchFriendChatRoomsAPI, action.data);
    if(!myFriendChatRooms) {
      const chatRoomId = yield call(makeChatRoomAPI, action.data);
      yield call(initChatsAPI, { chatRoomId });
      const friendInfo = yield call(searchFriendAPI, action.data);
      yield put({ type: SEARCH_CHATROOM_SUCCESS, data: { chatRoomId, friendInfo }});
    } else {
      const chatRoomId = yield call(searchChatRoomAPI, myFriendChatRooms);
      const friendInfo = yield call(searchFriendAPI, action.data);
      if(!chatRoomId) {
        const chatRoomId = yield call(makeChatRoomAPI, action.data);
        yield call(initChatsAPI, { chatRoomId });
        const friendInfo = yield call(searchFriendAPI, action.data);
        yield put({ type: SEARCH_CHATROOM_SUCCESS, data: { chatRoomId, friendInfo }});
      } else {
        yield put({ type: SEARCH_CHATROOM_SUCCESS, data: { chatRoomId, friendInfo }});
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
    const chatRoomId = result.chatRoomId;
    const myFriendEmail = yield call(getFriendEmailByChatrooms, { chatRoomId });
    const friendInfo = yield call(searchFriendAPI, { email: myFriendEmail });
    if(result && friendInfo) {
      yield put({ type: LOAD_CHATROOM_SUCCESS, data: { chatRoomId: result.chatRoomId, talks: result.talks, friendInfo }});
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

function* sendMessage(action: Action) {
  try {
    yield call(sendMessageAPI, action.data);
    yield put({ type: SEND_MESSAGE_SUCCESS });
  } catch(error) {
    yield put({
      type: SEND_MESSAGE_FAILURE,
      error: error.message
    });
  }
}

function* loadChatRooms(action: Action) {
  try {
    const myChatRooms = yield call(searchMyChatRoomsAPI, action.data);
    console.log('myChatRooms', myChatRooms);
    const recentChats = yield call(getRecentChatAPI, myChatRooms);
    console.log('recentChats', recentChats);
    yield put({ type: LOAD_CHATROOMS_SUCCESS, data: recentChats });
  } catch(error) {
    yield put({
      type: LOAD_CHATROOMS_FAILURE,
      error: error.message
    });
  }
}

function* searchChats(action: Action) {
  try {
    const friendEmail = yield call(searchChatsAPI, action.data);
    const friendInfo = yield call(searchFriendAPI, { email: friendEmail });
    const chatRoomId = action.data.chatRoomId;
    yield put({ type: SEARCH_CHATS_SUCCESS, data: { chatRoomId, friendInfo }});
  } catch(error) {
    yield put({
      type: SEARCH_CHATS_FAILURE,
      error: error.message
    });
  }
}

function* watchSearchChatRoom() {
  yield takeLatest(SEARCH_CHATROOM_REQUEST, searchChatRoom);
}

function* watchLoadChatRoom() {
  yield takeLatest(LOAD_CHATROOM_REQUEST, loadChatRoom);
}

function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
}

function* watchLoadChatRooms() {
  yield takeLatest(LOAD_CHATROOMS_REQUEST, loadChatRooms);
}

function* watchSearchChats() {
  yield takeLatest(SEARCH_CHATS_REQUEST, searchChats);
}

export default function* userSaga() {
  yield all([
    fork(watchSearchChatRoom),
    fork(watchLoadChatRoom),
    fork(watchSendMessage),
    fork(watchLoadChatRooms),
    fork(watchSearchChats),
  ]);
}