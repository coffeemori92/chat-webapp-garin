import styled from 'styled-components';

export const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E1B444;
  button {
      width: 250px;
      height: 35px;
      border: 0.5px solid gray;
      border-bottom: none;
      outline-width: 1px;
      &:nth-child(5) {
        border-bottom: 0.5px solid gray;
      }
  }
`;

export const Logo = styled.div`
  margin-bottom: 42px;
  img {
    border-radius: 50%;
  }
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    input {
      border: none;
      width: 250px;
      height: 35px;
      &:nth-child(2) {
        border-top: 0.5px solid gray;
        margin-bottom: 10px;
      }
    }
`;