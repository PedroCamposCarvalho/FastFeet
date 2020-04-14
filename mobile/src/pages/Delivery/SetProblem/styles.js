import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const ContainerProblem = styled.View`
  margin-top: -25%;
  background: #fff;
  margin-left: 20px;
  margin-right: 20px;
  padding: 15px;
  border-radius: 5px;
`;

export const TextBox = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  width: 80%;
  height: 40%;
  margin-top: 20px;
  background: #fff;
  border-radius: 4px;
  padding: 0 15px;
  color: #000;
`;

export const SendButton = styled(RectButton)`
  width: 90%;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
  height: 50px;
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 15px;
`;

export const TextEnviar = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const TextError = styled.Text`
  margin-left: 20px;
  margin-top: 10px;
  color: #e74040;
`;
