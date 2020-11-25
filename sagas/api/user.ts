import { reduxSagaFirebase, myFirebaseApp, dbService, storageService, authService } from '../../util/firebase';
import { v4 as uuidv4 } from 'uuid';

export const signupAPI = async (data: any) => {
  await authService.createUserWithEmailAndPassword(data.email, data.password);
}
export const socialLoginAPI = async (data: any) => {
  const user = await authService.signInWithPopup(data).then(result => {
    return result.user;
  });
  const usersEmail = [];
  const usersUid = [];
  await dbService.collection('users')
        .get().then(snapshot => {
          snapshot.forEach(doc => {
            usersEmail.push(doc.id);
            usersUid.push(doc.data().uid);
          })
        });
  if(!usersEmail.includes(user.email) && 
     !usersUid.includes(user.uid)) {
    await dbService.collection('users')
          .doc(user.email)
          .set({
            uid: user.uid,
            nickname: user.displayName,
            email: user.email,
            shortMsg: '',
            photoURL: user.photoURL,
            friends: [],
          });
    const result = await dbService.collection('users')
                    .doc(user.email)
                    .get().then((doc) => doc.data());
    return result;
  } else if(usersEmail.includes(user.email) &&
            usersUid.includes(user.uid)){
    const result = await dbService.collection('users')
    .doc(user.email)
    .get().then((doc) => doc.data());
    return result;
  } else {
    await authService.signOut();
    return false;
  }
}
export const loginAPI = (data: any) => reduxSagaFirebase.auth.signInWithEmailAndPassword(data.email, data.password);
export const loadMyInfoAPI = async (data: any) => {
  const me = await dbService.collection('users')
          .doc(data.email)
          .get().then(doc => {
            if(doc.exists) {
              return doc.data();
            }
          });
  return me;
}
export const logoutAPI = async () => await authService.signOut().then(() => { return });
export const registerNicknameAPI = async (data: any) => {
  await myFirebaseApp.auth().currentUser.updateProfile({
    displayName: data.nickname
  });
}
export const registerDefaultPhotoURLAPI = async (data: any) => {
  await myFirebaseApp.auth().currentUser.updateProfile({
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-webapp-garin.appspot.com/o/default%2F05ce44b3-6dc9-46bd-92c8-dcba68966ca6?alt=media&token=6aa9df1f-fda3-48b8-9efd-c5948ff3f3be',
  });
}
export const registerUserAPI = async (data: any) => {
  await dbService.collection('users')
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
export const addFriendAPI = async (data: any) => {
  await dbService.collection('users')
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
  let myInfo = {};
  await dbService.collection('users')
          .doc(myFirebaseApp.auth().currentUser?.email!)
          .get().then(doc => {
            myInfo = doc.data();
          });
  return myInfo;
};
export const editProfileAPI = async (data: any) => {
  const me = myFirebaseApp.auth().currentUser;
  const attachmentImage = data.attachmentImage;
  if(attachmentImage) {
    const attachmetRef = storageService
                          .ref()
                          .child(`${me.email!}/${uuidv4()}`);
    const response = await attachmetRef.putString(attachmentImage, 'data_url');
    const attachmentUrl = await response.ref.getDownloadURL();
    const myChatRooms = [];
    let talks = [];
    await dbService.collection('chatrooms')
    .where('users', 'array-contains', `${me.email}`)
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        myChatRooms.push(doc.id);
      });
    });
    for(let i = 0; i < myChatRooms.length; i++) {
      await dbService.collection('chats')
            .doc(myChatRooms[i])
            .get().then(doc => {
              talks.push([doc.id, doc.data().talks]);
            });
    }
    for(let i = 0; i < talks.length; i++) {
      const eachInfo = talks[i][1];
      for(let j = 0; j < eachInfo.length; j++) {
        if(eachInfo[j].user === me.displayName) {
          eachInfo[j].user = data.nickname;
          eachInfo[j].photoURL = attachmentUrl;
        }
      }
    }
    for(let i = 0; i < talks.length; i++) {
      await dbService.collection('chats')
            .doc(talks[i][0])
            .update({
              talks: talks[i][1]
            });
    }
    await me.updateProfile({
      photoURL: attachmentUrl,
      displayName: data.nickname,
    });
    await dbService.collection('users')
    .doc(me.email)
    .update({
      "photoURL": attachmentUrl,
      "nickname": data.nickname,
      "shortMsg": data.shortMsg,
    });
    let friends = [];
    await dbService.collection('users')
    .get().then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.data().email, doc.data().friends);
              friends.push([doc.data().email, doc.data().friends]);
            })
          });
    for(let i = 0; i < friends.length; i++) {
      const eachInfo = friends[i][1];
      for(let j = 0; j < eachInfo.length; j++) {
        if(eachInfo[j].email === me.email) {
          eachInfo[j].photoURL = attachmentUrl;
          eachInfo[j].nickname = data.nickname;
          eachInfo[j].shortMsg = data.shortMsg;
        }
      }
    }
    for(let i = 0; i < friends.length; i++) {
      await dbService.collection('users')
            .doc(friends[i][0])
            .update({
              friends: friends[i][1]
            });
    }
    let myInfo = {};
    await dbService.collection('users')
          .doc(me.email)
          .get().then(doc => {
            myInfo = doc.data();
          });
    return myInfo;
  } else {
    const myChatRooms = [];
    let talks = [];
    await dbService.collection('chatrooms')
    .where('users', 'array-contains', `${me.email}`)
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        myChatRooms.push(doc.id);
      });
    });
    for(let i = 0; i < myChatRooms.length; i++) {
      await dbService.collection('chats')
            .doc(myChatRooms[i])
            .get().then(doc => {
              talks.push([doc.id, doc.data().talks]);
            });
    }
    for(let i = 0; i < talks.length; i++) {
      const eachInfo = talks[i][1];
      for(let j = 0; j < eachInfo.length; j++) {
        if(eachInfo[j].user === me.displayName) {
          eachInfo[j].user = data.nickname;
        }
      }
    }
    for(let i = 0; i < talks.length; i++) {
      await dbService.collection('chats')
            .doc(talks[i][0])
            .update({
              talks: talks[i][1]
            });
    }
    await me.updateProfile({
      displayName: data.nickname,
    });
    await dbService.collection('users')
    .doc(me.email)
    .update({
      "nickname": data.nickname,
      "shortMsg": data.shortMsg,
    });
    let friends = [];
    await dbService.collection('users')
    .get().then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.data().email, doc.data().friends);
              friends.push([doc.data().email, doc.data().friends]);
            })
          });
    console.log('friends', friends, friends.length);
    for(let i = 0; i < friends.length; i++) {
      const eachInfo = friends[i][1];
      for(let j = 0; j < eachInfo.length; j++) {
        if(eachInfo[j].email === me.email) {
          eachInfo[j].nickname = data.nickname;
          eachInfo[j].shortMsg = data.shortMsg;
        }
      }
    }
    for(let i = 0; i < friends.length; i++) {
      await dbService.collection('users')
            .doc(friends[i][0])
            .update({
              friends: friends[i][1]
            });
    }
    let myInfo = {};
    await dbService.collection('users')
          .doc(me.email)
          .get().then(doc => {
            myInfo = doc.data();
          });
    return myInfo;
  }
};