import styled from 'styled-components';
import { darken } from 'polished';

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

export const Info = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  background: #fff;
  border-radius: 5px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 20px;
  }

  .labelInput {
    cursor: pointer;
  }
  .divImagem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px dashed #dddddd;
    margin-top: 20px;
    p {
      color: #dddddd;
      font-weight: bold;
    }
  }
  .labelText {
    width: 90%;
  }
  input {
    width: 90%;
    margin-top: 5px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    height: 40px;
    color: #999999;
    padding: 15px;
    margin-bottom: 15px;
  }
`;
