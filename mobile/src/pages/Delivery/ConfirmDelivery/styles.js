import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';
import { Image } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;
export const ContainerFoto = styled.View`
  align-self: center;
  margin-top: -25%;
  width: 80%;
  height: 80%;
`;

export const SendButton = styled(RectButton)`

  background:#7d50e7;
  width: 100%;
  align-self: center;
  margin-top: 30px
  border-radius: 5px;
  height: 50px;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  align-self: center;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const TakePictureButton = styled(RectButton)`
  width: 50px;
  border-radius: 25px;
  padding: 15px;
  align-self: center;
  margin: 20px;
  align-items: center;
  background: rgba(52, 52, 52, 0.5);
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ImageContainer = styled.View`
  flex: 1;
`;

export const ImagePreview = styled(Image)`
  flex: 1;
`;
