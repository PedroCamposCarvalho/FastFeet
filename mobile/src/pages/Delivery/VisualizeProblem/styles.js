import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const Info = styled.View`
  flex: 1;
  align-items: center;
`;
export const Titulo = styled.Text`
  color: #fff;
  margin-top: -25%;
  font-weight: bold;
  font-size: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 90%;
  margin-top: 20px;
`;

export const Item = styled.View`
padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #eee
  margin-top: 10px;
  height: 50px;
  border-radius: 5px;
`;

export const Descricao = styled.Text`
  color: #999999;
`;

export const Data = styled.Text`
  color: #c1c1c1;
`;
