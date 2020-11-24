import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';

import { INIT_CHATROOM_SEARCH_EXCEPT_CHATROOM_ID, INIT_SEARCH_CHATS_EXCEPT_CHATROOM_ID, LOAD_CHATROOM_REQUEST, SEND_MESSAGE_REQUEST } from '../../store/constants/chat';
import { ButtonArea, ChatArea, ChatBubble, ChatParagraph, ChatParagraphMainArea, ChatRoomContainer, Header, Label, TimeStampDiv, TypingArea } from '../../styles/ChatRoomStyle';
import { LOAD_MY_INFO_REQUEST } from '../../store/constants/user';
import { dbService, myFirebaseApp } from '../../util/firebase';

const ChatRoom = () => {
  const [text, setText] = useState('');
  const [newTalks, setNewTalks] = useState(null);
  const chatBubble = useRef(null);
  const textareaEl = useRef(null);
  const formEl = useRef(null);
  const { me } = useSelector((state: any) => state.user);
  const { searchChatRoomDone, talks, chatRoomId, talkWith, sendMessageDone, searchChatsDone, loadChatRoomDone } = useSelector((state: any) => state.chat);
  const dispatch = useDispatch();

  let textarea;

  useEffect(() => {
    if(loadChatRoomDone || sendMessageDone) {
      const scroll = Scroll.animateScroll;
      scroll.scrollToBottom();
    }
  }, [loadChatRoomDone, sendMessageDone]);

  useEffect(() => {
    if(textareaEl.current) {
      textarea = textareaEl.current;
      textarea.focus();
    }
    if(searchChatRoomDone) {
      dispatch({ type: INIT_CHATROOM_SEARCH_EXCEPT_CHATROOM_ID });
    }
    if(searchChatsDone) {
      dispatch({ type: INIT_SEARCH_CHATS_EXCEPT_CHATROOM_ID });
    }
  }, [searchChatRoomDone]);

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
    const browserPath = window.location.pathname;
    const talkId = browserPath.split('/')[2];
    if(talkId && me) {
      dispatch({ type: LOAD_CHATROOM_REQUEST, data: { talkId: talkId }});
    }
  }, [me]);

  useEffect(() => {
    if(chatRoomId && talks) {
      dbService.collection('chats')
      .doc(chatRoomId)
      .onSnapshot((snapshot) => {
        const chats = snapshot.data();
        const newTalks = chats.talks;
        setNewTalks(newTalks);
      });
    }
  }, [chatRoomId, talks]);

  const onKeyDown = useCallback((e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if(text !== '') {
        const browserPath = window.location.pathname;
        const talkId = browserPath.split('/')[2];  
        dispatch({ type: SEND_MESSAGE_REQUEST, data: { text, talkId, talks }});
        setText('');
      } 
    }
  }, [text, talks]);

  const onChange = useCallback(e => {
    const value = e.target.value;
    setText(value);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const browserPath = window.location.pathname;
    const talkId = browserPath.split('/')[2];  
    dispatch({ type: SEND_MESSAGE_REQUEST, data: { text, talkId, talks }});
    setText('');
    if(textareaEl.current) {
      textarea = textareaEl.current;
      textarea.focus();
    }
  }, [text, talks]);
  
  return (
    <ChatRoomContainer>
      <Header>
        { talkWith &&
        <>
          <img src={talkWith.photoURL}/>
          <div>{talkWith.nickname}</div>
        </>
          
        }
      </Header>
      <ChatArea ref={chatBubble}>
        { !newTalks &&
          talks.map((v, i) => {
            let myChat = false;
            const date = new Date(v.timestamp);
            const jDate = date.toLocaleTimeString('ja-JP', { hour12 :true, hour: '2-digit', minute:'2-digit' }).split('');
            jDate.splice(2, 0, ' ').join('');
            if(v.user === me.nickname) {
              myChat = true;
            }
            return (
                <ChatParagraph key={v.timestamp} myChat={myChat}>
                  <ChatParagraphMainArea myChat={myChat}>
                    {
                      myChat 
                      ? null
                      : <img src={v.photoURL} />
                    }
                    <div>
                      {
                        myChat
                        ? <ChatBubble>{v.content}</ChatBubble>
                        : (
                            <>
                              <Label>{v.user}</Label>
                              <ChatBubble>{v.content}</ChatBubble>
                            </>
                        )
                      }
                    </div>
                    <TimeStampDiv>
                      { jDate }
                    </TimeStampDiv>
                  </ChatParagraphMainArea>
                </ChatParagraph>
            )
          })
        }
        { newTalks &&
          newTalks.map((v, i) => {
            let myChat = false;
            const date = new Date(v.timestamp);
            const jDate = date.toLocaleTimeString('ja-JP', { hour12 :true, hour: '2-digit', minute:'2-digit' }).split('');
            jDate.splice(2, 0, ' ').join('');
            if(v.user === me.nickname) {
              myChat = true;
            }
            return (
                <ChatParagraph key={v.timestamp} myChat={myChat}>
                  <ChatParagraphMainArea myChat={myChat}>
                    {
                      myChat 
                      ? null
                      : <img src={v.photoURL} />
                    }
                    <div>
                      {
                        myChat
                        ? <ChatBubble>{v.content}</ChatBubble>
                        : (
                            <>
                              <Label>{v.user}</Label>
                              <ChatBubble>{v.content}</ChatBubble>
                            </>
                        )
                      }
                    </div>
                    <TimeStampDiv>
                      { jDate }
                    </TimeStampDiv>
                  </ChatParagraphMainArea>
                </ChatParagraph>
            )
          })
        }
      </ChatArea>
      <TypingArea>
        <form 
          ref={formEl}
          onSubmit={onSubmit}>
          <textarea
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={text}
            ref={textareaEl} 
            required/>
          <ButtonArea>
            <button>送信</button>
          </ButtonArea>
        </form>
      </TypingArea>
    </ChatRoomContainer>
  );
};

export default ChatRoom;

// {/* { me && !newTalks &&
//           talks.map((v, i) => {
//             let myChat = false;
//             const date = new Date(v.timestamp);
//             const jDate = date.toLocaleTimeString('ja-JP', { hour12 :true, hour: '2-digit', minute:'2-digit' }).split('');
//             jDate.splice(2, 0, ' ').join('');
//             if(v.user === me.nickname) {
//               myChat = true;
//             }
//             return (
//               <>
//                 <ChatParagraph key={v.timestamp} myChat={myChat}>
//                   <ChatParagraphMainArea myChat={myChat}>
//                     {
//                       myChat 
//                       ? null
//                       : <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
//                     }
//                     <div>
//                       {
//                         myChat
//                         ? <ChatBubble>{v.content}</ChatBubble>
//                         : (
//                             <>
//                               <Label>{v.user}</Label>
//                               <ChatBubble>{v.content}</ChatBubble>
//                             </>
//                         )
//                       }
//                     </div>
//                     <TimeStampDiv>{ jDate }</TimeStampDiv>
//                   </ChatParagraphMainArea>
//                 </ChatParagraph>
//               </>
//             )
//           })
//           }  */}

// { me && newTalks &&
//   newTalks.map((v, i) => {
//     console.log(v);
//     let myChat = false;
//     const date = new Date(v.timestamp);
//     const jDate = date.toLocaleTimeString('ja-JP', { hour12 :true, hour: '2-digit', minute:'2-digit' }).split('');
//     jDate.splice(2, 0, ' ').join('');
//     if(v.user === me.nickname) {
//       myChat = true;
//     }
//     return (
//       <>
//         <ChatParagraph key={v.timestamp} myChat={myChat} ref={chatBubble}>
//           <ChatParagraphMainArea myChat={myChat}>
//             {
//               myChat 
//               ? null
//               : <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
//             }
//             <div>
//               {
//                 myChat
//                 ? <ChatBubble>{v.content}</ChatBubble>
//                 : (
//                     <>
//                       <Label>{v.user}</Label>
//                       <ChatBubble>{v.content}</ChatBubble>
//                     </>
//                 )
//               }
//             </div>
//             <TimeStampDiv>
//               { jDate }
//             </TimeStampDiv>
//           </ChatParagraphMainArea>
//         </ChatParagraph>
//       </>
//     )
//   })
// }