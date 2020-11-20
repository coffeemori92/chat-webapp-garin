import { produce } from 'immer';
import { INIT_CHATROOM_SEARCH_EXCEPT_CHATROOM_ID, LOAD_CHATROOM_FAILURE, LOAD_CHATROOM_REQUEST, LOAD_CHATROOM_SUCCESS, SEARCH_CHATROOM_FAILURE, SEARCH_CHATROOM_REQUEST, SEARCH_CHATROOM_SUCCESS } from '../constants/chat';

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
      draft.chatRoomId = action.data;
      draft.searchChatRoomError = null;
      break;
    case SEARCH_CHATROOM_FAILURE:
      draft.searchChatRoomLoading = false;
      draft.searchChatRoomDone = false;
      draft.searchChatRoomError = action.error;
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
      draft.loadChatRoomError = null;
      break;
    case LOAD_CHATROOM_FAILURE:
      draft.loadChatRoomLoading = false;
      draft.loadChatRoomDone = false;
      draft.loadChatRoomError = action.error;
      break;
    case INIT_CHATROOM_SEARCH_EXCEPT_CHATROOM_ID:
      draft.searchChatRoomLoading = false;
      draft.searchChatRoomDone = false;
      draft.searchChatRoomError = null;
    default:
      break;
  }
});

export default reducer;