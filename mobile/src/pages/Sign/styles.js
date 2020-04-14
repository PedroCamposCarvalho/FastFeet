import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
  width: 100%;
`;

export const TextBox = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  width: 80%;
  height: 40px;
  margin-top: 20px;
  background: #fff;
  border-radius: 4px;
  padding: 0 15px;
  color: #000;
`;

export const Button = styled(RectButton)`
  background: #82bf18;
  width: 80%;
  height: 40px;
  margin-top: 20px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const TextError = styled.Text`
  color: #eb827a;
  margin-top: 20px;
`;
