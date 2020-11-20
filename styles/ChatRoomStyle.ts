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
  padding-top: 90px;
  padding-bottom: 150px;
  background-color: #B2C7DA;
`;

export const TypingArea = styled.div`
  position: fixed;
  background-color: white;
  width: 100%;
  height: 145px;
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
      padding: 12px;
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

export const ChatParagraph = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-left: 7px;
  margin-right: ${props => props.myChat ? '7px' : ''};
`;

export const ChatParagraphMainArea = styled.div`
  display: flex;
  flex-flow: ${props => props.myChat ? 'row-reverse' : ''};
  width: 100%;
  padding: 5px;
  img {
    margin-right: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const ChatBubble = styled.div`
  background-color: white;
  margin-top: 2px;
  border-radius: 7px;
  padding: 10px;
`;

export const Label = styled.div`
  padding: 3px;
`;

export const TimeStampDiv = styled.div`
  min-width: 70px;
  display: flex;
  align-items: flex-end;
  padding: 5px;
  font-size: 14px;
`;