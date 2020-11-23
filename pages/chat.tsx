import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { myFirebaseApp } from '../util/firebase';
import { LOAD_MY_INFO_REQUEST } from '../store/constants/user';
import AppLayout from '../components/AppLayout';
import { LOAD_CHATROOMS_REQUEST, SEARCH_CHATS_REQUEST } from '../store/constants/chat';
import { ChatArea, ChatContainer, ChatMainArea, Header, TimeStampArea, TimpStamp_AlertArea } from '../styles/ChatsStyle';

const Chat = () => {
  const { me, loadMyInfoDone, friends, } = useSelector((state: any) => state.user);
  const { recentChatRoomsInfo, chatRoomId, searchChatsDone } = useSelector((state: any) => state.chat);
  const router = useRouter();
  const dispatch = useDispatch();
  const chatDivEl = useRef(null);

  useEffect(() => {
    if(!me) {
      myFirebaseApp.auth().onAuthStateChanged(user => {
        if(user) {
          dispatch({ type: LOAD_MY_INFO_REQUEST, data: { email: user.email }});
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
    if(loadMyInfoDone) {
      dispatch({ type: LOAD_CHATROOMS_REQUEST, data: { email: me.email }});
    }
  }, [loadMyInfoDone, me]);

  const onClicked = useCallback((e) => {
    //console.log(e);
    const id = e.target.id;
    const className = e.target.className;
    if(chatDivEl.current) {
      const chatDivs = document.getElementsByClassName(className);
      const clickedDiv = document.getElementById(id);
      [].forEach.call(chatDivs, v => {
        v.parentNode.style.backgroundColor = '';
      });
      if(clickedDiv) {
        clickedDiv!.parentNode.style.backgroundColor = '#ECECED';
      }
    }
  }, []);

  const onDoubleClick = useCallback((e) => {
    //console.log('page', e.target.id);
    const chatRoomId = e.target.id;
    dispatch({ type: SEARCH_CHATS_REQUEST, data: { chatRoomId: chatRoomId }})
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
                    <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
                    <div>
                      <div>{v.friendsNickname}</div>
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