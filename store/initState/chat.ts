import { AddAlarm } from "@material-ui/icons";

const initState = {
  chatRoomLoading: false,
  chatRoomDone: false,
  chatRoomError: null,
};

export default initState;

/*
chatrooms/고유아이디/
users['aaa@aaa.com', 'bbb@bbb.com']

chats/chatrooms의 고유 아이디/
chats: [
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