import styled from 'styled-components';

export const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E1B444;
`;

export const LoginButton = styled.button`
      width: 250px;
      height: 35px;
      border: 0.5px solid gray;
      outline-width: 1px;
`;

export const TempButton = styled.button`
      width: 250px;
      height: 35px;
      border: 0.5px solid gray;
      border-top: none;
`;

export const Logo = styled.div`
  margin-bottom: 42px;
  img {
    border-radius: 50%;
    background-color: white;
    padding: 30px;
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