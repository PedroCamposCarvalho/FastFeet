import styled from 'styled-components';
import { darken } from 'polished';
import AsyncSelect from 'react-select/async';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
  h1 {
    font-size: 24px;
    font-weigth: bold;
  }
  div {
    display: flex;
    flex-direction: row;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 5px;
    margin-left: 15px;
    width: 120px;
    height: 36px;
    background: #7d40e7;
    p {
      font-weigth: bold;
      margin-left: 5px;
      color: #fff;
    }
    &:hover {
      background: ${darken(0.05, '#7d50e7')};
    }
  }
  button:first-of-type {
    background: #cccccc;
    &:hover {
      background: ${darken(0.05, '#cccccc')};
    }
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  background: #ffffff;
  margin-top: 20px;
  padding: 25px;
  border-radius: 5px;
  .divSelects {
    display: flex;
    width: 100%;
    justify-content: space-between;
    span {
      width: 48%;
    }
  }

  .inputProduct {
    margin-top: 15px;
    input {
      margin-top: 5px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      height: 40px;
      color: #999999;
      padding: 15px;
    }
  }
`;

export const DropDown = styled(AsyncSelect)`
  display: block;
  color: #999999;
  div {
    color: #999999;
  }
`;
