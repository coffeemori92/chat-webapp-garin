import React from 'react';
import AppLayout from '../components/AppLayout';

import styled from 'styled-components';

export const ChatContainer = styled.div`
  margin-top: 100px;
  width: 100%;
`;

export const ChatArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-bottom: 15px;
`;

export const ChatMainArea = styled.div`
  display: flex;
  width: 100%;
  img {
    margin-right: 5px;
    width: 65px;
    height: 65px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const TimpStamp_AlertArea = styled.div`
  
`;

export const TimeStampArea = styled.div`
  width: 100px;
  font-size: 12px;
  color: gray;
`;

export const Header = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  left: 100px;
  margin-top: 27px;
  h1 {
    font-size: 40px;
  }
`;

const Chat = () => {
  return (
    <>
      <AppLayout>
        <Header>
          <h1>トーク</h1>
        </Header>
        <ChatContainer>
        <ChatArea>
          <ChatMainArea>
            <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
            <div>
              <div>이름</div>
              <div>대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화</div>
            </div>
          </ChatMainArea>
          <TimpStamp_AlertArea>
            <TimeStampArea>午後 7:50</TimeStampArea>
            <div>1</div>
          </TimpStamp_AlertArea>
        </ChatArea>
        <ChatArea>
          <ChatMainArea>
            <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694" />
            <div>
              <div>이름</div>
              <div>대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화대화</div>
            </div>
          </ChatMainArea>
          <TimpStamp_AlertArea>
            <TimeStampArea>午後 7:50</TimeStampArea>
            <div>2</div>
          </TimpStamp_AlertArea>
        </ChatArea>
        </ChatContainer>
      </AppLayout>
    </>
  );
};

export default Chat;