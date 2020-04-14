import React, { Component } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Container, Titulo, ContainerOpcoes, Grid } from './styles';
import api from '~/services/api';
import CourierItem from './CourierItem';
import history from '~/services/history';
import FooterPages from '~/components/FooterPages';

export default class Courier extends Component {
  constructor() {
    super();
    this.state = {
      couriers: [],
      page: 1,
    };
    this.searchCourier = async courier => {
      if (courier === '') {
        const response = await api.get('/couriers');
        await this.setState({ couriers: response.data });
      } else {
        const couriers = await api.get(`/searchcouriers/${courier}`);
        await this.setState({ couriers: couriers.data.courier });
      }
    };
    this.updateList = async () => {
      const couriers = await api.get(`/couriers?page=1`);
      await this.setState({ couriers: couriers.data, page: 1 });
    };
    this.clickPlus = async () => {
      const { page } = this.state;
      const couriers = await api.get(`/couriers?page=${page + 1}`);
      if (couriers.data.length > 0) {
        await this.setState({ couriers: couriers.data, page: page + 1 });
      }
    };
    this.clickMinus = async () => {
      const { page } = this.state;
      if (page > 1) {
        const couriers = await api.get(`/couriers?page=${page - 1}`);
        await this.setState({ couriers: couriers.data, page: page - 1 });
      }
    };
  }

  async componentDidMount() {
    const couriers = await api.get('/couriers');
    await this.setState({ couriers: couriers.data });
  }

  render() {
    const { couriers, page } = this.state;
    return (
      <Container>
        <Titulo>
          <h1>Gerenciando entregadores</h1>
        </Titulo>
        <ContainerOpcoes>
          <div>
            <MdSearch size={20} color="#999999" />
            <input
              type="text"
              placeholder="Buscar por entregadores"
              onChange={e => this.searchCourier(e.target.value)}
            />
          </div>
          <button type="button" onClick={() => history.push('/CreateCourier')}>
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
        </ContainerOpcoes>
        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Foto</strong>
            <strong>Nome</strong>
            <strong>Email</strong>
            <strong>Ações</strong>
          </section>
          {couriers.map(courier => (
            <CourierItem
              key={courier.id}
              data={courier}
              updateCourier={this.updateList}
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
