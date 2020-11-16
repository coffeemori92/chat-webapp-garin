import { produce } from 'immer';

import initState from '../initState/user';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SOCIAL_LOG_IN_FAILURE, SOCIAL_LOG_IN_REQUEST, SOCIAL_LOG_IN_SUCCESS } from '../constants/user';

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
      draft.me = action.data;
      break;
    case LOG_IN_FAILURE:
    case SOCIAL_LOG_IN_FAILURE:
      draft.loginLoading = false;
      draft.loginDone = false;
      draft.loginError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutError = null;
      draft.logoutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutDone = false;
      draft.logoutError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;