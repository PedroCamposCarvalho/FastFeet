import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 10%;
  margin-top: 20px;
  background: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Welcome = styled.View`
  margin-right: 15%;
`;

export const TextWelcomeBack = styled.Text`
  color: #666666;
`;

export const TextCourierName = styled.Text`
  color: #444444;
  font-size: 20px;
  font-weight: bold;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin: 20px 0 20px 0;
`;

export const TextDeliveries = styled.Text`
  color: #444444;
  font-size: 20px;
  font-weight: bold;
`;

export const ViewOptions = styled.View`
  flex-direction: row;
`;

export const ButtonPendentes = styled(RectButton)`
  margin-right: 10px;
  justify-content: center;
`;

export const ButtonEntregues = styled(RectButton)`
  justify-content: center;
`;

export const TextButtonActive = styled.Text`
  color: #7d40e7;
  text-decoration-line: underline;
  font-weight: bold;
`;

export const TextButtonInactive = styled.Text`
  color: #999999;
  text-decoration-line: underline;
  font-weight: bold;
`;
export const ButtonLogOff = styled(RectButton)``;

export const List = styled.FlatList`
  flex: 1;
`;

export const ImagePhoto = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 100px;
`;
