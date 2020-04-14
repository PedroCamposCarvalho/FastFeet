import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import TruckIcon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import { formatarData } from '~/utils/functions';
import api from '~/services/api';
import DeliveryTracking from '~/components/DeliveryTracking';
import {
  Container,
  Header,
  Welcome,
  TextWelcomeBack,
  TextCourierName,
  Options,
  ViewOptions,
  TextDeliveries,
  ButtonPendentes,
  ButtonEntregues,
  TextButtonActive,
  TextButtonInactive,
  ButtonLogOff,
  List,
  ImagePhoto,
} from './styles';

import {
  ItemContainer,
  ItemHeader,
  TextEntrega,
  TrackingContainer,
  DetailsContainer,
  Detail,
  TextTitle,
  TextValue,
  DetailButton,
  TextButton,
} from './ItemStyles';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      courier: {},
      file: {},
      pendingOrders: [],
      completedOrders: [],
      selectedTab: 0,
      loading: false,
    };
    this.mostrarPendentes = async () => {
      const { courier } = this.state;
      const pendingOrders = await api.get(
        `/deliveryman/${courier.id}/pendingdeliveries`
      );
      await this.setState({
        pendingOrders: pendingOrders.data,
        selectedTab: 0,
      });
    };
    this.mostrarEntregues = async () => {
      const courierStorage = await AsyncStorage.getItem('courier');
      await this.setState({ courier: JSON.parse(courierStorage) });
      const { courier } = this.state;
      const completedOrders = await api.get(
        `/deliveryman/${courier.id}/completeddeliveries`
      );
      await this.setState({
        completedOrders: completedOrders.data,
        selectedTab: 1,
      });
    };
    this.handleLogOff = async () => {
      await AsyncStorage.removeItem('courier');
      const { navigation } = this.props;
      navigation.navigate('Sign');
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    const courierStorage = await AsyncStorage.getItem('courier');
    await this.setState({ courier: JSON.parse(courierStorage) });
    const { courier } = this.state;
    const pendingOrders = await api.get(
      `/deliveryman/${courier.id}/pendingdeliveries`
    );
    const completedOrders = await api.get(
      `/deliveryman/${courier.id}/completeddeliveries`
    );
    await this.setState({
      pendingOrders: pendingOrders.data,
      completedOrders: completedOrders.data,
      file: courier.File,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      await this.setState({ loading: true });
      console.tron.log('entrou aqui');
      const { courier } = this.state;
      const pendingOrders = await api.get(
        `/deliveryman/${courier.id}/pendingdeliveries`
      );
      const completedOrders = await api.get(
        `/deliveryman/${courier.id}/completeddeliveries`
      );
      await this.setState({
        pendingOrders: pendingOrders.data,
        completedOrders: completedOrders.data,
        loading: false,
      });
    }
  }

  render() {
    const {
      courier,
      selectedTab,
      pendingOrders,
      completedOrders,
      file,
      loading,
    } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <ImagePhoto source={{ uri: file.url }} />
          <Welcome>
            <TextWelcomeBack>Bem vindo de volta,</TextWelcomeBack>
            <TextCourierName>{courier.name}</TextCourierName>
          </Welcome>
          <ButtonLogOff onPress={this.handleLogOff}>
            <Icon name="log-out" size={25} color="red" />
          </ButtonLogOff>
        </Header>
        <Options>
          <TextDeliveries>Entregas</TextDeliveries>
          <ViewOptions>
            <ButtonPendentes onPress={this.mostrarPendentes}>
              {selectedTab === 0 ? (
                <TextButtonActive>Pendentes</TextButtonActive>
              ) : (
                <TextButtonInactive>Pendentes</TextButtonInactive>
              )}
            </ButtonPendentes>
            <ButtonEntregues onPress={this.mostrarEntregues}>
              {selectedTab === 1 ? (
                <TextButtonActive>Entregues</TextButtonActive>
              ) : (
                <TextButtonInactive>Entregues</TextButtonInactive>
              )}
            </ButtonEntregues>
          </ViewOptions>
        </Options>
        {loading ? (
          <></>
        ) : (
          <SafeAreaView style={{ height: '90%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedTab === 0 ? (
                <List
                  data={pendingOrders}
                  keyExtractor={(order) => order.id}
                  renderItem={({ item, index }) => (
                    <ItemContainer>
                      <ItemHeader>
                        <TruckIcon name="truck" size={20} color="#7D40E7" />
                        <TextEntrega>
                          Encomenda {index < 10 ? `0${index + 1}` : index}
                        </TextEntrega>
                      </ItemHeader>
                      <TrackingContainer>
                        <DeliveryTracking
                          status={
                            item.start_date === null ? 'Aguardando' : 'Retirada'
                          }
                        />
                      </TrackingContainer>
                      <DetailsContainer>
                        <Detail>
                          <TextTitle>Data</TextTitle>
                          <TextValue>{formatarData(item.created_at)}</TextValue>
                        </Detail>
                        <Detail>
                          <TextTitle>Cidade</TextTitle>
                          <TextValue>{item.Recipient.cidade}</TextValue>
                        </Detail>
                        <Detail>
                          <DetailButton
                            onPress={() =>
                              navigation.navigate('Details', {
                                id: item.id,
                                entregue: false,
                              })
                            }
                          >
                            <TextButton>Ver detalhes</TextButton>
                          </DetailButton>
                        </Detail>
                      </DetailsContainer>
                    </ItemContainer>
                  )}
                />
              ) : (
                <List
                  data={completedOrders}
                  keyExtractor={(order) => order.id}
                  renderItem={({ item, index }) => (
                    <ItemContainer>
                      <ItemHeader>
                        <TruckIcon name="truck" size={20} color="#7D40E7" />
                        <TextEntrega>
                          Encomenda {index < 10 ? `0${index + 1}` : index}
                        </TextEntrega>
                      </ItemHeader>
                      <TrackingContainer>
                        <DeliveryTracking status="Entregue" />
                      </TrackingContainer>
                      <DetailsContainer>
                        <Detail>
                          <TextTitle>Data</TextTitle>
                          <TextValue>{formatarData(item.created_at)}</TextValue>
                        </Detail>
                        <Detail>
                          <TextTitle>Cidade</TextTitle>
                          <TextValue>{item.Recipient.cidade}</TextValue>
                        </Detail>
                        <Detail>
                          <DetailButton
                            onPress={() =>
                              navigation.navigate('Details', {
                                id: item.id,
                                entregue: true,
                              })
                            }
                          >
                            <TextButton>Ver detalhes</TextButton>
                          </DetailButton>
                        </Detail>
                      </DetailsContainer>
                    </ItemContainer>
                  )}
                />
              )}
            </ScrollView>
          </SafeAreaView>
        )}
      </Container>
    );
  }
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigationFocus(Dashboard);
