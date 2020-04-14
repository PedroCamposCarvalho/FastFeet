import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ViewAvatar = styled.View`
  margin-bottom: 30px;
`;

export const Detail = styled.View`
  align-items: flex-start;
  width: 80%;
  margin-top: 20px;
`;

export const Title = styled.Text`
  color: #666666;
  font-size: 10px;
`;

export const Value = styled.Text`
  color: #444444;
  font-size: 20px;
  font-weight: bold;
`;

export const ButtonLogOff = styled(RectButton)`
  align-items: center;
  justify-content: center;
  background: #e74040;
  width: 100%;
  height: 50px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ImagePhoto = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;
