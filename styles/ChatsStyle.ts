import styled from 'styled-components';

export const ChatContainer = styled.div`
  margin-top: 100px;
  width: 100%;
`;

export const ChatArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 14px;
  margin-bottom: 15px;
  padding: 5px;
  cursor: pointer;
  &:hover{
    background-color: #ECECED;
  }
`;

export const ChatMainArea = styled.div`
  display: flex;
  width: 100%;
  img {
    margin-left: 5px;
    margin-right: 5px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const TimpStamp_AlertArea = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeStampArea = styled.div`
  width: 100px;
  font-size: 12px;
  color: gray;
  display: flex;
  justify-content: center;
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