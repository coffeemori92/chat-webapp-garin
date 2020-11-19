import styled, { keyframes } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

export const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;

export const SignupLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 500px;
  border-radius: 5px;
  background-color: #F9FAFB
`;

export const Label = styled.h1`
  position: absolute;
  top: 5.2%;
  left: 10%;
  font-size: 30px;
  font-weight: 500;
`;

export const AddFriendForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  input {
    margin-top: 100px;
    width: 278px;
    height: 35px;
    border: none;
    background-color: #F9FAFB;
    border-bottom: 1px solid gray;
  }
  button {
    position: absolute;
    border: 0.5px solid gray;
    height: 35px;
    width: 100px;
    right: 5%;
    bottom: 5%;
  }
`;

export const ErrorMsg = styled.div`
  display: flex;
  margin-top: 115px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  div {
    padding: 5px;
  }
`;

export const closeIconRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 3%;
  right: 3%;
  z-index: 1;
  &:hover {
    animation: ${closeIconRotate} 0.5s;
    cursor: pointer;
  }
`;