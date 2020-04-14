import styled from 'styled-components';

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

export const Grid = styled.div`
  height: 400px;
  margin-top: 20px;
  width: 80%;
  > section {
    display: grid;
    padding-left: 25px;
    padding-right: 13px;
    grid-template-columns: 0.5fr 1.5fr 1fr;
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
