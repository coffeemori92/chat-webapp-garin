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
              const chatRoomId = doc.id
              return {
                chatRoomId,
                ...talks,
              }
            } else {
              return false;
            }
          });
};
export const initChatsAPI = (data: any) => {
  console.log('initChatsRoomApi');
  return dbService.collection('chats')
          .doc(data.chatRoomId)
          .set({
            talks: [],
          });
};
// TODO user 이미지 추가
export const sendMessageAPI = (data: any) => {
  return dbService.collection('chats')
          .doc(data.talkId)
          .get().then(doc => {
            const chats = doc.data();
            const talks = chats.talks;
            dbService.collection('chats')
              .doc(data.talkId)
              .set({
                talks: [...talks, {
                  content: data.text,
                  timestamp: Date.now(),
                  user: myFirebaseApp.auth().currentUser.displayName,
                }]
              }, { merge: true })
          })
};
export const getFriendEmailByChatrooms = (data: any) => {
  return dbService.collection('chatrooms')
          .doc(data.chatRoomId)
          .get().then(doc => {
            if(doc.exists) {
              const myEmail = myFirebaseApp.auth().currentUser.email;
              const users = doc.data().users;
              let myFriendEmail = '';
              users.map(v => {
                if(myEmail !== v) {
                  myFriendEmail = v;
                }
              });
              return myFriendEmail;
            }
          });
};
export const searchMyChatRoomsAPI = (data: any) => {
  const myChatRooms = [];
  return dbService.collection('chatrooms')
          .where('users', 'array-contains', `${data.email}`)
          .get().then(snapshot => {
            snapshot.forEach((doc) => {
              myChatRooms.push(doc.id);
            });
            return myChatRooms;
          });
};
export const getRecentChatAPI = async (data: any) => {
  const myChatRooms = data;
  const exisitingChatRooms = [];
  const recentChats = [];
  const friendsEmails = [];
  const frinedsNicknames = [];
  let talks = [];
  for(let i = 0; i < myChatRooms.length; i++) {
    await dbService.collection('chats')
      .doc(myChatRooms[i])
      .get().then(doc => {
        talks = doc.data().talks;
        if(talks.length) {
          talks[talks.length - 1].chatRoomId = doc.id;
          exisitingChatRooms.push(doc.id);
          recentChats.push(talks[talks.length - 1]);
        }
      });
  }
  console.log('exisitingChatRooms', exisitingChatRooms);
  for(let i = 0; i < exisitingChatRooms.length; i++) {
    await dbService.collection('chatrooms')
            .doc(exisitingChatRooms[i])
            .get().then(doc => {
              const users = doc.data().users;
              users.map(v => {
                if(v !== myFirebaseApp.auth().currentUser.email) {
                  friendsEmails.push(v);
                }
              })
            });
  }
  console.log('friendsEmails', friendsEmails);
  for(let i = 0; i < friendsEmails.length; i++) {
    await dbService.collection('users')
          .doc(friendsEmails[i])
          .get().then(doc => {
              const nicknames = doc.data().nickname;
              frinedsNicknames.push(nicknames);
          });
  }
  for(let i = 0; i < recentChats.length; i++) {
    recentChats[i].friendsNickname = frinedsNicknames[i];
  }
  recentChats.sort((a, b) => b.timestamp - a.timestamp);
  return recentChats;
};
export const searchChatsAPI = async (data: any) => {
  console.log('data', data);
  let friendEmail = '';
  await dbService.collection('chatrooms')
          .doc(data.chatRoomId)
          .get().then(doc => {
            const users = doc.data().users;
            users.map(v => {
              if(myFirebaseApp.auth().currentUser.email !== v) {
                friendEmail = v;
              }
            })
          });
  return friendEmail;
};