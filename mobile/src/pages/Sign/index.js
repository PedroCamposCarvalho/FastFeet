import React, { Component } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, TextBox, Button, Text, TextError } from './styles';
import logo from '~/assets/fastfeet-logo2.png';
import api from '~/services/api';

class Sign extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      courierFound: true,
      loading: false,
    };

    this.logIn = async () => {
      const { id } = this.state;
      this.setState({ loading: true });
      try {
        const response = await api.get(`/couriers/${id}`);
        this.setState({ courierFound: true });
        AsyncStorage.setItem('courier', JSON.stringify(response.data));
        const { navigation } = this.props;
        navigation.navigate('App');
      } catch (error) {
        this.setState({ courierFound: false });
        this.setState({ loading: false });
      }
    };
  }

  render() {
    const { id, courierFound, loading } = this.state;
    return (
      <Container>
        <Image source={logo} style={{ transform: [{ scale: 0.5 }] }} />
        <TextBox
          value={id}
          keyboardType="number-pad"
          placeholder="Informe de ID de cadastro"
          returnKeyType="done"
          onChangeText={(text) => this.setState({ id: text })}
        />
        <Button onPress={this.logIn}>
          {loading ? (
            <Text>Carregando...</Text>
          ) : (
            <Text>Entrar no sistema</Text>
          )}
        </Button>
        {courierFound ? (
          <></>
        ) : (
          <TextError>Estregador não encontrato</TextError>
        )}
      </Container>
    );
  }
}
Sign.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(Sign);
