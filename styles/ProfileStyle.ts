import styled, { keyframes } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

export const ProfileLayout = styled.div`
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

export const ProfileForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  input, button {
    width: 250px;
    height: 35px;
    border: 0.5px solid gray;
    margin-bottom: 20px;
  }
  input {
    border: none;
    outline: 1px solid #E1B444;
  }
  button {
    position: absolute;
    bottom: 5%;
  }
`;

export const ErrorMsg = styled.div`
  position: absolute;
  color: red;
  left: 14%;
  bottom: 28%;
  font-size: 12px;
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

export const DarkBackground = styled.div`
  position: fixed;
  z-index: 500;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;