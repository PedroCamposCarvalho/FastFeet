import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import Toast from 'react-native-tiny-toast';
import Background from '~/components/Background';
import api from '~/services/api';
import {
  Container,
  ContainerProblem,
  TextBox,
  SendButton,
  TextEnviar,
  TextError,
} from './styles';

export default class SetProblem extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      problem: '',
      error: false,
    };
    this.createProblem = async () => {
      const { id, problem } = this.state;
      const { navigation } = this.props;
      if (problem === '') {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
        try {
          await api.post('/problems', {
            delivery_id: id,
            description: problem,
          });
          Toast.show('Problema cadastrado com sucesso!', {
            position: 0,
          });
          navigation.navigate('Details', { id });
        } catch (error) {
          Toast.show('Erro ao processar sua solicitação', {
            position: 0,
          });
        }
      }
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    this.setState({ id });
  }

  render() {
    const { problem, error } = this.state;
    return (
      <Container>
        <Background />
        <ContainerProblem>
          <TextBox
            value={problem}
            returnKeyType="send"
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            onChangeText={(text) => this.setState({ problem: text })}
            multiline
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </ContainerProblem>
        {error ? <TextError>Informe um problema!</TextError> : <></>}
        <SendButton onPress={this.createProblem}>
          <TextEnviar>Enviar</TextEnviar>
        </SendButton>
      </Container>
    );
  }
}

SetProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.func,
  }).isRequired,
};
