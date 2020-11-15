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
    width: 100px;
    height: 100px;
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