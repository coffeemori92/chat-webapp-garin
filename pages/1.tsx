import React from 'react';

import styled from 'styled-components';

export const ChatRoomContainer = styled.div`
  height: 100vh;
  background-color: #B2C7DA;
`;

export const Header = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  background-color: #A9BDCE;
  padding: 10px;
  img {
      margin-right: 10px;
      width: 65px;
      height: 65px;
      border-radius: 50%;
    }
`;

export const ChatArea = styled.div`

`;

export const TypingArea = styled.div`
  position: fixed;
  background-color: white;
  width: 100%;
  height: 150px;
  bottom: 0;
  form {
    height: 100%;
    display: flex;
    textarea {
      height: 100%;
      width: 92%;
      resize: none;
      border: none;
      outline: none;
      font-size: 15px;
    }
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  width: 8%;
  button {
      cursor: pointer;
      width: 70px;
      height: 40px;
      border: 0.5px solid gray;
      margin-top: 20px;
      border-radius: 3px;
    }
`;

const ChatRoom = () => {
  return (
    <ChatRoomContainer>
      <Header>
        <img src="https://d2v9k5u4v94ulw.cloudfront.net/small_light(dw=200,dh=200,da=l,ds=s,cw=200,ch=200,cc=FFFFFF)/assets/images/3726945/original/f2c4f5ce-c69f-41d1-850f-0ddf76c82a9b?1556698179%27)/assets/images/372694"/>
        <div>아이디</div>
      </Header>
      <ChatArea>

      </ChatArea>
      <TypingArea>
        <form>
          <textarea />
          <ButtonArea>
            <button>送信</button>
          </ButtonArea>
        </form>
      </TypingArea>
    </ChatRoomContainer>
  );
};

export default ChatRoom;