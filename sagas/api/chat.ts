import { reduxSagaFirebase, myFirebaseApp, dbService } from '../../util/firebase';

export const loadChatRoomAPI = (data: any) => {
  console.log(data);
  console.log(myFirebaseApp.auth().currentUser?.email);
  return dbService.collection('chatrooms')
          .where('users', 'array-contains', `${myFirebaseApp.auth().currentUser?.email}`)
          .where('users', 'array-contains', `${data.email}`)
          .get().then((doc) => {
            console.log('doc', doc);
          });
};