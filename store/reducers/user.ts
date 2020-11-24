import { produce } from 'immer';

import initState from '../initState/user';
import { EDIT_PROFILE_REQUEST ,ADD_FRIEND_FAILURE, ADD_FRIEND_REQUEST, ADD_FRIEND_SUCCESS, INIT_ADD_FRIEND_STATE, LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SOCIAL_LOG_IN_FAILURE, SOCIAL_LOG_IN_REQUEST, SOCIAL_LOG_IN_SUCCESS, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from '../constants/user';

const reducer = (state = initState, action: any) => produce(state, draft => {
  switch(action.type) {
    case SIGN_UP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      draft.signupError = null;
      break;
    case SIGN_UP_FAILURE:
      draft.signupLoading = false;
      draft.signupDone = false;
      draft.signupError = action.error;
      break;
    case LOG_IN_REQUEST:
    case SOCIAL_LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOG_IN_SUCCESS:
    case SOCIAL_LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      break;
    case LOG_IN_FAILURE:
    case SOCIAL_LOG_IN_FAILURE:
      draft.loginLoading = false;
      draft.loginDone = false;
      draft.loginError = action.error;
      break;
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.me = action.data;
      draft.loadMyInfoDone = true;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutError = null;
      draft.logoutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      break;
    case LOG_OUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutDone = false;
      draft.logoutError = action.error;
      break;
    case ADD_FRIEND_REQUEST:
      draft.addFriendLoading = true;
      draft.addFriendError = null;
      draft.addFriendDone = false;
      break;
    case ADD_FRIEND_SUCCESS:
      draft.addFriendLoading = false;
      draft.addFriendDone = true;
      draft.addedNewFriend = true;
      break;
    case ADD_FRIEND_FAILURE:
      draft.addFriendLoading = false;
      draft.addFriendDone = false;
      draft.addFriendError = action.error;
      break;
    case EDIT_PROFILE_REQUEST:
      draft.editProfileLoading = true;
      draft.editProfileError = null;
      draft.editProfileDone = false;
      break;
    case EDIT_PROFILE_SUCCESS:
      draft.editProfileLoading = false;
      draft.editProfileDone = true;
      draft.me = action.data;
      break;
    case EDIT_PROFILE_FAILURE:
      draft.editProfileLoading = false;
      draft.editProfileDone = false;
      draft.editProfileError = action.error;
      break;
    case INIT_ADD_FRIEND_STATE:
      draft.addFriendLoading = false;
      draft.addFriendDone = false;
      draft.addFriendError = null;
      break;
    default:
      break;
  }
});

export default reducer;