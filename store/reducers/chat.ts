import { produce } from 'immer';
import { LOAD_CHATROOM_FAILURE, LOAD_CHATROOM_REQUEST, LOAD_CHATROOM_SUCCESS } from '../constants/chat';

import initState from '../initState/chat';

const reducer = (state = initState, action: any) => produce(state, draft => {
  switch(action.type) {
    case LOAD_CHATROOM_REQUEST:
      draft.chatRoomLoading = true;
      draft.chatRoomDone = false;
      draft.chatRoomError = null;
      break;
    case LOAD_CHATROOM_SUCCESS:
      draft.chatRoomLoading = false;
      draft.chatRoomDone = true;
      draft.chatRoomError = null;
      break;
    case LOAD_CHATROOM_FAILURE:
      draft.chatRoomLoading = false;
      draft.chatRoomDone = false;
      draft.chatRoomError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;