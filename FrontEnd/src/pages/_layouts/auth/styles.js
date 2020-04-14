import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  form {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px 20px 30px 20px;
    border-radius: 5px;
    width: 400px;
    height: 400px;

    img {
      margin-bottom: 30px;
    }

    label {
      width: 100%;
      font-weight: bold;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 10px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      margin: 20px 0 20px 0;
    }
    button {
      width: 100%;
      background: #7d40e7;
      color: #fff;
      border: 0;
      border-radius: 5px;
      height: 40px;
      font-weight: bold;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
