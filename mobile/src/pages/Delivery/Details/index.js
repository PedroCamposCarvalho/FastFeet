import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-tiny-toast';
import Background from '~/components/Background';
import api from '~/services/api';
import {
  formatarData,
  firstTwoLetters,
  calcularStatus,
} from '~/utils/functions';
import {
  Container,
  DeliveryInfo,
  IconContainer,
  TextInfo,
  ItemContainer,
  ItemTitle,
  ItemValue,
  ContainerDatas,
  ContainerOpcoes,
  Option,
  TextOption,
  ConfirmarRetirada,
  TextButton,
} from './styles';

export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      courier: {},
      order: {},
      recipient: {},
      uf: '',
      dataRetirada: null,
      dataEntrega: null,
      status: '',
      entregue: false,
    };
    this.retirarEntrega = async () => {
      const { navigation } = this.props;
      const { id } = navigation.state.params;
      const { courier } = this.state;
      const response = await api
        .put(`orders/${id}`, {
          deliveryman_id: courier.id,
          start_date: new Date(),
        })
        .catch((error) => {
          Toast.show(error.response.data.error, {
            position: 0,
          });
        });
      if (response) {
        Toast.show('Entrega retirada com sucesso', {
          position: 0,
        });
        navigation.navigate('Dashboard');
      }
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    const { id, entregue } = navigation.state.params;
    const response = await api.get(`/order/${id}`);
    const courierStorage = await AsyncStorage.getItem('courier');
    await this.setState({
      order: response.data,
      recipient: response.data.Recipient,
      uf: firstTwoLetters(response.data.Recipient.estado),
      dataRetirada: formatarData(response.data.start_date),
      dataEntrega: formatarData(response.data.end_date),
      status: calcularStatus(
        response.data.start_date,
        response.data.end_date,
        response.data.canceled_at
      ),
      entregue,
      courier: JSON.parse(courierStorage),
    });
  }

  render() {
    const {
      order,
      recipient,
      uf,
      dataRetirada,
      dataEntrega,
      status,
      entregue,
    } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <Background />
        <DeliveryInfo>
          <IconContainer>
            <Icon name="truck" size={20} color="#7D40E7" />
            <TextInfo>Informações da entrega</TextInfo>
          </IconContainer>
          <ItemContainer>
            <ItemTitle>DESTINATÁRIO</ItemTitle>
            <ItemValue>{recipient.nome}</ItemValue>
          </ItemContainer>
          <ItemContainer>
            <ItemTitle>ENDEREÇO DE ENTREGA</ItemTitle>
            <ItemValue>
              {recipient.rua}, {recipient.numero}, {recipient.cidade}, {uf},{' '}
              {recipient.cep}
            </ItemValue>
          </ItemContainer>
          <ItemContainer>
            <ItemTitle>PRODUTO</ItemTitle>
            <ItemValue>{order.product}</ItemValue>
          </ItemContainer>
        </DeliveryInfo>
        <DeliveryInfo>
          <IconContainer>
            <Icon name="calendar-day" size={20} color="#7D40E7" />
            <TextInfo>Situação da entrega</TextInfo>
          </IconContainer>
          <ItemContainer>
            <ItemTitle>STATUS</ItemTitle>
            <ItemValue>{status}</ItemValue>
          </ItemContainer>
          <ContainerDatas>
            <ItemContainer>
              <ItemTitle>DATA DE RETIRADA</ItemTitle>
              <ItemValue>{dataRetirada}</ItemValue>
            </ItemContainer>
            <ItemContainer>
              <ItemTitle>DATA DE ENTREGA</ItemTitle>
              <ItemValue>{dataEntrega}</ItemValue>
            </ItemContainer>
          </ContainerDatas>
        </DeliveryInfo>
        {entregue ? (
          <></>
        ) : (
          <ContainerOpcoes>
            {dataRetirada === '--/--/----' ? (
              <ConfirmarRetirada onPress={this.retirarEntrega}>
                <TextButton>Retirar entrega</TextButton>
              </ConfirmarRetirada>
            ) : (
              <>
                <Option
                  onPress={() =>
                    navigation.navigate('SetProblem', { id: order.id })
                  }
                >
                  <Icon2
                    name="ios-close-circle-outline"
                    size={30}
                    color="#E74040"
                  />
                  <TextOption>Informar Problema</TextOption>
                </Option>
                <Option
                  onPress={() =>
                    navigation.navigate('VisualizeProblem', { id: order.id })
                  }
                >
                  <Icon2
                    name="ios-information-circle-outline"
                    size={30}
                    color="#E7BA40"
                  />
                  <TextOption>Visualizar Problemas</TextOption>
                </Option>
                <Option
                  onPress={() =>
                    navigation.navigate('ConfirmDelivery', { id: order.id })
                  }
                >
                  <Icon2
                    name="ios-checkmark-circle-outline"
                    size={30}
                    color="#7D40E7"
                  />
                  <TextOption>Confirmar Entrega</TextOption>
                </Option>
              </>
            )}
          </ContainerOpcoes>
        )}
      </Container>
    );
  }
}

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.func,
  }).isRequired,
};
