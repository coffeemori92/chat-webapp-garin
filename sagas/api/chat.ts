import { myFirebaseApp, dbService } from '../../util/firebase';

export const searchChatRoomAPI = (data: []) => {
  console.log('searchChatRoomAPI');
  const myChatRooms = [];
  const myFriendChatRooms = data;
  return dbService.collection('chatrooms')
          .where('users', 'array-contains', `${myFirebaseApp.auth().currentUser.email}`)
          .get().then(snapshot => {
            snapshot.forEach(doc => {
              myChatRooms.push(doc.id)
            });
            console.log(myChatRooms);
            if(!myChatRooms.length) {
              return false;
            } else {
              for(let i = 0; i < myChatRooms.length; i++) {
                for(let j = 0; j < myFriendChatRooms.length; j++) {
                  if(myChatRooms[i] === myFriendChatRooms[j]) {
                    return myFriendChatRooms[j];
                  }
                }
              }
            }
          });
};
export const searchFriendChatRoomsAPI = (data: any) => {
  console.log('searchFriendChatRoomsAPI');
  const myFriendChatRooms = [];
  return dbService.collection('chatrooms')
          .where('users', 'array-contains', `${data.email}`)
          .get().then(snapshot => {
            snapshot.forEach(doc => {
              myFriendChatRooms.push(doc.id);
            });
            if(!myFriendChatRooms.length) {
              return false;
            } else {
              return myFriendChatRooms;
            }
          });
};
export const makeChatRoomAPI = (data: any) => {
  console.log('makeChatRoomAPI');
  return dbService.collection('chatrooms')
          .add({
            users: [myFirebaseApp.auth().currentUser.email, data.email],
          })
          .then(doc => doc.id);
};
export const loadChatRoomAPI = (data: any) => {
  console.log('loadChatRoomAPI');
  return dbService.collection('chats')
          .doc(data.talkId)
          .get().then(doc => {
            if(doc.exists) {
              const talks = doc.data();
              return {
                chatRoomId: doc.id,
                ...talks,
              };
            } else {
              return false;
            }
          });
};
  