import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  left: 100px;
  margin-top: 27px;
  h1, svg {
    font-size: 40px;
  }
  svg {
    cursor: pointer;
  }
  div {
    margin-right: 135px;
  }
`;

export const SearchBar = styled.div`
  position: fixed;
  width: 100%;
  left: 100px;
  margin-top: 87px;
  display: flex;
  justify-content: space-between;
  & {
    div:nth-child(1) {
      display: flex;
      border: 0.5px solid gray;
      border-color: white;
      align-items: center;
      border-radius: 10px;
      width: 100%;
      height: 30px;
      background-color: #ECECED;
      svg {
        margin-left: 5px;
      }
      input {
        margin-left: 5px;
        border: none;
        width: 300px;
        background-color: #ECECED;
    }
    }
    div:nth-child(2) {
      margin-right: 135px;
    }
  }
`;

export const MyinfoArea = styled.div`
  position: fixed;
  width: 100%;
  left: 100px;
  margin-top: 137px;
  display: flex;
  justify-content: space-between;
`;

export const MyInfoAreaMain = styled.div`
  display: flex;
  border-bottom: 1px solid #ECECED;
  width: 100%;
  img {
    margin-right: 5px;
    width: 85px;
    height: 85px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const LayoutDiv = styled.div`
  margin-right: 135px;
`;

export const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 245px;
  width: 100%;
`;

export const FriendArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  margin-bottom: 5px;
`;

export const FriendMainArea = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #ECECED;
  }
  img {
    margin-left: 21px;
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

export const FriendLayoutDiv = styled.div`
  width: 35px;
`;

export const FriendsNumArea = styled.div`
  margin-left: 30px;
  margin-bottom: 8px;
  color: gray;
  font-size: 14px;
`;