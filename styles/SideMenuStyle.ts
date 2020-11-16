import styled from 'styled-components';

export const MenuBar = styled.ul`
  width: 75px;
  background-color: #ECECED;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  li {
    cursor: pointer;
    &:nth-child(1) {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    &:nth-child(3) {
      position: absolute;
      bottom: 5%;
      transition: transform 1s ease;
      &:hover {
        transform: rotate(90deg);
      }
    }
    svg {
      font-size: 40px;
    }
  }
`;