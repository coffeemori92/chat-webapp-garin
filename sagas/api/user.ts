import { reduxSagaFirebase, myFirebaseApp, dbService } from '../../util/firebase';

export const signupAPI = (data: any) => reduxSagaFirebase.auth.createUserWithEmailAndPassword(data.email, data.password);
export const socialLoginAPI = (data: any) => reduxSagaFirebase.auth.signInWithPopup(data);
export const loginAPI = (data: any) => reduxSagaFirebase.auth.signInWithEmailAndPassword(data.email, data.password);
export const loadMyInfoAPI = (data: any) => {
  return dbService.collection('users')
          .doc(data.email)
          .get().then(doc => {
            if(doc.exists) {
              return doc.data();
            }
          });
}
export const logoutAPI = () => reduxSagaFirebase.auth.signOut();
export const registerNicknameAPI = (data: any) => reduxSagaFirebase.auth.updateProfile({ displayName: data.nickname });
export const registerUserAPI = (data: any) => {
  return dbService.collection('users')
          .doc(data.email)
          .set({
            uid: myFirebaseApp.auth().currentUser?.uid,
            nickname: data.nickname,
            email: data.email,
            shortMsg: '',
            photoURL: myFirebaseApp.auth().currentUser?.photoURL,
            friends: [],
          });
};
export const searchFriendAPI = (data: any) => {
  return dbService.collection('users')
          .doc(data.email)
          .get().then(doc => {
            if(doc.exists) {
              return doc.data();
            } else {
              return false;
            }
          });
};
export const addFriendAPI = (data: any) => {
  return dbService.collection('users')
          .doc(myFirebaseApp.auth().currentUser?.email!)
          .get().then(doc => {
            const user = doc.data();
            const friends = user!.friends;
            dbService.collection('users')
              .doc(myFirebaseApp.auth().currentUser?.email!)
              .set({
                friends: [...friends, {
                  uid: data.uid,
                  nickname: data.nickname,
                  email: data.email,
                  shortMsg: data.shortMsg,
                  photoURL: data.photoURL,
                }]
              }, { merge: true });
          });
};