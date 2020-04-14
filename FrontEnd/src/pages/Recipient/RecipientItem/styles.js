import styled from 'styled-components';

export const Container = styled.div`
  height: 57px;
  background: #fff;
  border-radius: 4px;
  padding-left: 25px;
  padding-right: 13px;
  display: grid;
  grid-template-columns: 0.5fr 1fr 2.5fr 0.6fr;
  > small:last-child {
    text-align: right;
  }
  > small {
    font-size: 16px;
    color: #666;
    text-align: left;
    margin: auto 0;
  }
  > section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const ContainerBotoes = styled.div`
  display: flex;
  align-items: right;
  justify-content: flex-start;
  flex-direction: column;
  button {
    margin: 10px 0 10px 0;
    display: flex;
    background: none;
    align-items: center;
    justify-content: flex-start;
    border: 0;
    color: #999999;
  }
  hr {
    color: #eeeeee;
  }
`;
