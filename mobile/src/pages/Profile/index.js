import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { formatarData } from '~/utils/functions';
import {
  Container,
  ViewAvatar,
  Detail,
  Title,
  Value,
  ButtonLogOff,
  ButtonText,
  ImagePhoto,
} from './styles';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      courier: {},
      file: {},
      dataFormatada: null,
    };
    this.handleLogOff = async () => {
      await AsyncStorage.removeItem('courier');
      const { navigation } = this.props;
      navigation.navigate('Sign');
    };
  }

  async componentDidMount() {
    const courierStorage = await AsyncStorage.getItem('courier');
    await this.setState({ courier: JSON.parse(courierStorage) });
    const { courier } = this.state;
    console.tron.log(courier);
    await this.setState({
      dataFormatada: formatarData(courier.createdAt),
      file: courier.File,
    });
  }

  render() {
    const { courier, file, dataFormatada } = this.state;

    return (
      <Container>
        <ViewAvatar>
          <ImagePhoto source={{ uri: file.url }} />
        </ViewAvatar>
        <Detail>
          <Title>Nome completo</Title>
          <Value>{courier.name}</Value>
        </Detail>
        <Detail>
          <Title>E-mail</Title>
          <Value>{courier.email}</Value>
        </Detail>
        <Detail>
          <Title>Data de cadastro</Title>
          <Value>{dataFormatada}</Value>
        </Detail>
        <Detail>
          <ButtonLogOff onPress={this.handleLogOff}>
            <ButtonText>Logout</ButtonText>
          </ButtonLogOff>
        </Detail>
      </Container>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="user-circle" size={25} color={tintColor} />
  ),
};
