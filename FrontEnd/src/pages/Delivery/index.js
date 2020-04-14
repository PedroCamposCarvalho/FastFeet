import React, { Component } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import {
  Container,
  Titulo,
  ContainerOpcoes,
  Grid,
  ContainerEntregasComProblema,
} from './styles';
import DeliveryItem from './DeliveryItem';
import history from '~/services/history';
import api from '~/services/api';
import { CalcularStatus } from '~/utils/formats';
import FooterPages from '~/components/FooterPages';

export default class Delivery extends Component {
  constructor() {
    super();
    this.state = {
      deliveries: [],
      page: 1,
      showProblems: false,
    };
    this.searchProduct = async product => {
      if (product === '') {
        const response = await api.get('/orders');
        response.data.map(item => {
          const status = CalcularStatus(
            item.start_date,
            item.end_date,
            item.canceledAt
          );
          item.status = status;
        });
        await this.setState({ deliveries: response.data });
      } else {
        const response = await api.get(`/orderproduct/${product}`);
        if (response.data.length > 0) {
          response.data.map(item => {
            const status = CalcularStatus(
              item.start_date,
              item.end_date,
              item.canceledAt
            );
            item.status = status;
          });
        }
        await this.setState({ deliveries: response.data });
      }
    };
    this.updateList = async () => {
      const response = await api.get('/orders?page=1');
      if (response.data.length > 0) {
        response.data.map(item => {
          const status = CalcularStatus(
            item.start_date,
            item.end_date,
            item.canceledAt
          );
          item.status = status;
        });
      }
      await this.setState({
        deliveries: response.data,
        page: 1,
      });
    };
    this.clickPlus = async () => {
      const { page } = this.state;
      const response = await api.get(`/orders?page=${page + 1}`);
      if (response.data.length > 0) {
        response.data.map(item => {
          const status = CalcularStatus(
            item.start_date,
            item.end_date,
            item.canceledAt
          );
          item.status = status;
        });

        await this.setState({
          deliveries: response.data,
          page: page + 1,
        });
      }
    };
    this.clickMinus = async () => {
      const { page } = this.state;
      if (page > 1) {
        const response = await api.get(`/orders?page=${page - 1}`);
        response.data.map(item => {
          const status = CalcularStatus(
            item.start_date,
            item.end_date,
            item.canceledAt
          );
          item.status = status;
        });

        await this.setState({ deliveries: response.data, page: page - 1 });
      }
    };
    this.showproblems = async () => {
      const { showProblems } = this.state;
      await this.setState({ showProblems: !showProblems });
      if (!showProblems) {
        const response = await api.get('/problemorder');
        const ordersTemp = [];
        response.data.forEach(item => {
          const status = CalcularStatus(
            item.Order.start_date,
            item.Order.end_date,
            item.Order.canceled_at
          );
          item.Order.status = status;
          ordersTemp.push(item.Order);
        });
        await this.setState({ deliveries: ordersTemp });
      } else {
        const response = await api.get(`/orders?page=1`);
        response.data.forEach(item => {
          const status = CalcularStatus(
            item.start_date,
            item.end_date,
            item.canceled_at
          );
          item.status = status;
        });
        await this.setState({ deliveries: response.data });
      }
    };
  }

  async componentDidMount() {
    const response = await api.get(`/orders?page=1`);
    response.data.forEach(item => {
      const status = CalcularStatus(
        item.start_date,
        item.end_date,
        item.canceledAt
      );
      item.status = status;
    });
    await this.setState({ deliveries: response.data });
  }

  render() {
    const { deliveries, page, showProblems } = this.state;
    return (
      <Container>
        <Titulo>
          <h1>Gerenciando encomendas</h1>
        </Titulo>
        <ContainerOpcoes>
          <div>
            <MdSearch size={20} color="#999999" />
            <input
              type="text"
              placeholder="Buscar por encomendas"
              onChange={e => this.searchProduct(e.target.value)}
            />
          </div>
          <button type="button" onClick={() => history.push('/CreateDelivery')}>
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
        </ContainerOpcoes>
        <ContainerEntregasComProblema>
          <input
            type="checkbox"
            id="entregaProblema"
            name="entregaProblema"
            value={showProblems}
            onChange={() => {
              this.showproblems();
            }}
          />
          <span>Mostrar apenas entregas com problema</span>
        </ContainerEntregasComProblema>
        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Destinatário</strong>
            <strong>Produto</strong>
            <strong>Cidade</strong>
            <strong>Estado</strong>
            <strong>Status</strong>
            <strong>Ações</strong>
          </section>
          {deliveries.map(delivery => (
            <DeliveryItem
              key={delivery.id}
              data={delivery}
              updateDelivery={this.updateList}
            />
          ))}
        </Grid>
        <FooterPages
          page={page}
          clickPlus={this.clickPlus}
          clickMinus={this.clickMinus}
        />
      </Container>
    );
  }
}
