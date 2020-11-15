import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';

const rootReducer = (state: any, action: any) => {
  switch(action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;