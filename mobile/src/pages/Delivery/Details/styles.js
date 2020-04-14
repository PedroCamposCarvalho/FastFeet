import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const DeliveryInfo = styled.View`
  margin-top: -25%;
  margin-bottom: 30%;
  background: #fff;
  margin-left: 20px;
  margin-right: 20px;
  padding: 15px;
  border-radius: 5px;
`;

export const IconContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
`;

export const TextInfo = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;

export const ItemContainer = styled.View``;

export const ItemTitle = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  color: #999999;
`;

export const ItemValue = styled.Text`
  margin-top: 5px;
  color: #666666;
`;

export const ContainerDatas = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerOpcoes = styled.View`
  margin-top: -100px;
  background: #f8f9fd;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const Option = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: 30%;
`;

export const TextOption = styled.Text`
  color: #999999;
  font-size: 15px;
  margin-top: 5px;
`;

export const ConfirmarRetirada = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
export const TextButton = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-top: 5px;
  font-weight: bold;
`;
