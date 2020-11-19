import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import chatSaga from './chat';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(chatSaga),
  ]);
}