import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { myFirebaseApp } from '../util/firebase';
import { LOAD_MY_INFO_REQUEST } from '../store/constants/user';
import AppLayout from '../components/AppLayout';
import { LOAD_CHATROOMS_REQUEST, SEARCH_CHATS_REQUEST } from '../store/constants/chat';
import { ChatArea, ChatContainer, ChatMainArea, Header, TimeStampArea, TimpStamp_AlertArea } from '../styles/ChatsStyle';

const Chat = () => {
  const { me } = useSelector((state: any) => state.user);
  const { recentChatRoomsInfo, chatRoomId, searchChatsDone } = useSelector((state: any) => state.chat);
  const router = useRouter();
  const dispatch = useDispatch();
  const chatDivEl = useRef(null);

  useEffect(() => {
    if(!me) {
      myFirebaseApp.auth().onAuthStateChanged(user => {
        if(user) {
          dispatch({ type: LOAD_MY_INFO_REQUEST, data: { email: user.email }});
        } else {
          alert('先にログインしてください。');
          router.replace('/');
        }
      });
    }
  }, [me]);

  useEffect(() => {
    if(searchChatsDone) {
      router.push({
        pathname: '/chatroom/[id]',
        query: { id: chatRoomId },
      });
    }
  }, [searchChatsDone]);

  useEffect(() => {
    if(me) {
      dispatch({ type: LOAD_CHATROOMS_REQUEST, data: { email: me.email }});
    }
  }, [me]);

  const onClicked = useCallback((e) => {
    const id = e.target.id;
    const className = e.target.className;
    if(chatDivEl.current) {
      const chatDivs = document.getElementsByClassName(className);
      const clickedDiv = document.getElementById(id);
      [].forEach.call(chatDivs, v => {
        v.parentNode.style.backgroundColor = '';
      });
      if(clickedDiv) {
        clickedDiv!.parentElement.style.backgroundColor = '#ECECED';
      }
    }
  }, []);

  const onDoubleClick = useCallback((e) => {
    const chatRoomId = e.target.id;
    if(chatRoomId) {
      dispatch({ type: SEARCH_CHATS_REQUEST, data: { chatRoomId: chatRoomId }});
    }
  }, []);
  
  return (
    <>
      <AppLayout>
        <Header>
          <h1>トーク</h1>
        </Header>
        <ChatContainer>
          {
            recentChatRoomsInfo &&
            recentChatRoomsInfo.map((v, i) => {
              const date = new Date(v.timestamp);
              const jDate = date.toLocaleTimeString('ja-JP', { hour12 :true, hour: '2-digit', minute:'2-digit' }).split('');
              jDate.splice(2, 0, ' ').join('');
              return (
                <ChatArea key={v.timestamp}>
                  <ChatMainArea
                    id={v.chatRoomId}
                    onClick={onClicked}
                    onDoubleClick={onDoubleClick}
                    ref={chatDivEl}
                    >
                    <img src={v.photoURL}/>
                    <div>
                      <div>{v.user}</div>
                      <div>{v.content}</div>
                    </div>
                  </ChatMainArea>
                  <TimpStamp_AlertArea>
                    <TimeStampArea>{ jDate }</TimeStampArea>
                  </TimpStamp_AlertArea>
                </ChatArea>
              )
            })
          }
        </ChatContainer>
      </AppLayout>
    </>
  );
};

export default Chat;