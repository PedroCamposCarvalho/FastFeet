import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Titulo = styled.div`
  margin-top: 20px;
  width: 80%;
  align-items: left;
  h1 {
    font-size: 24px;
    font-weigth: bold;
  }
`;

export const ContainerOpcoes = styled.div`
  display: flex;
  width: 80%;
  margin-top: 30px;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    height: 36px;
    width: 240px;
    padding: 0 16px;
    background: #fff;
    border: 2px solid #ddd;
    border-radius: 4px;
  }
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    background: #7d50e7;
    border: 0;
    border-radius: 5px;
    width: 120px;
    height: 36px;
    color: #fff;
    font-size: 12px;
    font-weigth: bold;

    &:hover {
      background: ${darken(0.05, '#7d50e7')};
    }
  }
  input {
    width: 100%;
    font-size: 14px;
    border: 0;
    background: none;
    color: #444;
    ::placeholder {
      color: #999;
    }
  }
  svg {
    margin-right: 8px;
  }
`;

export const Grid = styled.div`
  height: 400px;
  margin-top: 20px;
  width: 80%;
  > section {
    display: grid;
    padding-left: 25px;
    padding-right: 13px;
    grid-template-columns: 0.5fr 1fr 1.5fr 1fr 1fr;
    strong:last-child {
      text-align: right;
    }
    strong {
      font-size: 16px;
      color: #444;
    }
    margin-bottom: 15px;
  }
  > div + div {
    margin-top: 20px;
  }
`;
