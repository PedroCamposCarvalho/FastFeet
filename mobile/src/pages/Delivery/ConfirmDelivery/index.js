import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';
import {
  Container,
  ContainerFoto,
  SendButton,
  TextButton,
  TakePictureButton,
  Camera,
  ButtonContainer,
  ImageContainer,
  ImagePreview,
} from './styles';
import Background from '~/components/Background';
import api from '~/services/api';

export default class ConfirmDelivery extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: null,
    };
    this.takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true, exif: true };
        const data = await this.camera.takePictureAsync(options);
        console.tron.log(data);
        await this.setState({ data });
      }
    };
    this.sendPicture = async () => {
      const { data } = this.state;
      if (data) {
        const dataFile = new FormData();
        dataFile.append('file', {
          type: 'image/jpg',
          uri: data.uri,
          name: 'assignature.jpg',
        });
        const response = await api.post('files', dataFile);
        const { id } = response.data;
        const { navigation } = this.props;
        await api.put(`orders/${navigation.state.params.id}`, {
          end_date: new Date(),
          signature_id: id,
        });
        Toast.show('Entrega concluída com sucesso!', {
          position: 0,
        });
        navigation.navigate('Dashboard');
      } else {
        Toast.show('Tire uma foto da entrega para finalizar', {
          position: 0,
        });
      }
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Container>
        <Background />
        <ContainerFoto>
          {data ? (
            <ImageContainer>
              <ImagePreview source={{ uri: data.uri }} />
            </ImageContainer>
          ) : (
            <Camera
              ref={(ref) => {
                this.camera = ref;
              }}
              type={Camera.Constants.Type.back}
            >
              <ButtonContainer>
                <TakePictureButton onPress={this.takePicture.bind(this)}>
                  <Icon name="camera" size={20} color="#fff" />
                </TakePictureButton>
              </ButtonContainer>
            </Camera>
          )}
          <SendButton onPress={this.sendPicture}>
            <TextButton>Enviar</TextButton>
          </SendButton>
        </ContainerFoto>
      </Container>
    );
  }
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.func,
  }).isRequired,
};
