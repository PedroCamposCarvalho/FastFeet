import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ItemContainer = styled.View`
  flex: 1;
  border: 1px solid #999999;
  border-radius: 5px;
  margin-bottom: 40px;
  max-height: 180px;
  justify-content: flex-end;
`;

export const ItemHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const TextEntrega = styled.Text`
  color: #7d40e7;
  margin-left: 15px;
  font-weight: bold;
`;

export const TrackingContainer = styled.View`
  align-items: center;
`;

export const DetailsContainer = styled.View`
  padding: 10px 10px 10px 10px;
  background: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-radius: 5px;
`;

export const Detail = styled.View`
  justify-content: flex-end;
`;

export const TextTitle = styled.Text`
  color: #999999;
  font-size: 10px;
`;

export const TextValue = styled.Text`
  color: #444444;
  font-size: 12px;
  font-weight: bold;
`;

export const DetailButton = styled(RectButton)``;

export const TextButton = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
`;
