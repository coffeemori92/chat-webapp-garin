import { produce } from 'immer';
import { INIT_CHATROOM_SEARCH_EXCEPT_CHATROOM_ID, INIT_SEARCH_CHATS_EXCEPT_CHATROOM_ID, LOAD_CHATROOMS_FAILURE, LOAD_CHATROOMS_REQUEST, LOAD_CHATROOMS_SUCCESS, LOAD_CHATROOM_FAILURE, LOAD_CHATROOM_REQUEST, LOAD_CHATROOM_SUCCESS, SEARCH_CHATROOM_FAILURE, SEARCH_CHATROOM_REQUEST, SEARCH_CHATROOM_SUCCESS, SEARCH_CHATS_FAILURE, SEARCH_CHATS_REQUEST, SEARCH_CHATS_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../constants/chat';

import initState from '../initState/chat';

const reducer = (state = initState, action: any) => produce(state, draft => {
  switch(action.type) {
    case SEARCH_CHATROOM_REQUEST:
      draft.searchChatRoomLoading = true;
      draft.searchChatRoomDone = false;
      draft.searchChatRoomError = null;
      break;
    case SEARCH_CHATROOM_SUCCESS:
      draft.searchChatRoomLoading = false;
      draft.searchChatRoomDone = true;
      draft.chatRoomId = action.data.chatRoomId;
      draft.talkWith = action.data.friendInfo;
      draft.searchChatRoomError = null;
      break;
    case SEARCH_CHATROOM_FAILURE:
      draft.searchChatRoomLoading = false;
      draft.searchChatRoomDone = false;
      draft.searchChatRoomError = action.error;
      break;
    case SEARCH_CHATS_REQUEST:
      draft.searchChatsLoading = true;
      draft.searchChatsDone = false;
      draft.searchChatsError = null;
      break;
    case SEARCH_CHATS_SUCCESS:
      draft.searchChatsLoading = false;
      draft.searchChatsDone = true;
      draft.chatRoomId = action.data.chatRoomId;
      draft.talkWith = action.data.friendInfo;
      draft.searchChatsError = null;
      break;
    case SEARCH_CHATS_FAILURE:
      draft.searchChatsLoading = false;
      draft.searchChatsDone = false;
      draft.searchChatsError = action.error;
      break;
    case LOAD_CHATROOM_REQUEST:
      draft.loadChatRoomLoading = true;
      draft.loadChatRoomDone = false;
      draft.loadChatRoomError = null;
      break;
    case LOAD_CHATROOM_SUCCESS:
      draft.loadChatRoomLoading = false;
      draft.loadChatRoomDone = true;
      draft.chatRoomId = action.data.chatRoomId;
      draft.talks = action.data.talks;
      draft.talkWith = action.data.friendInfo;
      draft.loadChatRoomError = null;
      break;
    case LOAD_CHATROOM_FAILURE:
      draft.loadChatRoomLoading = false;
      draft.loadChatRoomDone = false;
      draft.loadChatRoomError = action.error;
      break;
    case LOAD_CHATROOMS_REQUEST:
      draft.loadChatRoomsLoading = true;
      draft.loadChatRoomsDone = false;
      draft.loadChatRoomsError = null;
      break;
    case LOAD_CHATROOMS_SUCCESS:
      draft.loadChatRoomsLoading = false;
      draft.loadChatRoomsDone = true;
      draft.recentChatRoomsInfo = action.data;
      draft.loadChatRoomsError = null;
      break;
    case LOAD_CHATROOMS_FAILURE:
      draft.loadChatRoomsLoading = false;
      draft.loadChatRoomsDone = false;
      draft.loadChatRoomsError = action.error;
      break;
    case SEND_MESSAGE_REQUEST:
      draft.sendMessageLoading = true;
      draft.sendMessageDone = false;
      draft.sendMessageError = null;
      break;
    case SEND_MESSAGE_SUCCESS:
      draft.sendMessageLoading = false;
      draft.sendMessageDone = true;
      draft.sendMessageError = null;
      break;
    case SEND_MESSAGE_FAILURE:
      draft.sendMessageLoading = false;
      draft.sendMessageDone = false;
      draft.sendMessageError = action.error;
      break;
    case INIT_CHATROOM_SEARCH_EXCEPT_CHATROOM_ID:
      draft.searchChatRoomLoading = false;
      draft.searchChatRoomDone = false;
      draft.searchChatRoomError = null;
    case INIT_SEARCH_CHATS_EXCEPT_CHATROOM_ID:
      draft.searchChatsLoading = false;
      draft.searchChatsDone = false;
      draft.searchChatsError = null;
    default:
      break;
  }
});

export default reducer;