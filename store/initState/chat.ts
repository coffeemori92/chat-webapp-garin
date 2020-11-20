const initState = {
  chatRoomId: null,
  talks: [],
  searchChatRoomLoading: false,
  searchChatRoomDone: false,
  searchChatRoomError: null,
  loadChatRoomLoading: false,
  loadChatRoomDone: false,
  loadChatRoomError: null,
};

export default initState;

/*
chatrooms/고유아이디/
users : [aaa@aaa.com, bbb@bbb.com,]

chats/chatrooms의 고유 아이디/
talks: [
  {
    user: 'aaa@aaa.com',
    content: '',
    timestamp: '',
  },
  {
    user: 'bbb@bbb.com',
    content: '',
    timestamp: '',
  }
]

**/