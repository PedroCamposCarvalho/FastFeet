import React, { Component } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Container, Titulo, ContainerOpcoes, Grid } from './styles';
import api from '~/services/api';
import Recipientitem from './RecipientItem';
import history from '~/services/history';
import FooterPages from '~/components/FooterPages';

export default class Recipient extends Component {
  constructor() {
    super();
    this.state = {
      recipients: [],
      page: 1,
    };
    this.searchRecipient = async recipient => {
      if (recipient === '') {
        const response = await api.get('/allrecipients');
        await this.setState({ recipients: response.data });
      } else {
        const recipients = await api.get(`/searchrecipients/${recipient}`);
        await this.setState({ recipients: recipients.data.recipient });
      }
    };
    this.updateList = async () => {
      const recipients = await api.get('/allrecipients?page=1');
      await this.setState({ recipients: recipients.data, page: 1 });
    };
    this.clickPlus = async () => {
      const { page } = this.state;
      const recipients = await api.get(`/allrecipients?page=${page + 1}`);
      if (recipients.data.length > 0) {
        await this.setState({ recipients: recipients.data, page: page + 1 });
      }
    };
    this.clickMinus = async () => {
      const { page } = this.state;
      if (page > 1) {
        const recipients = await api.get(`/allrecipients?page=${page - 1}`);
        await this.setState({ recipients: recipients.data, page: page - 1 });
      }
    };
  }

  async componentDidMount() {
    const recipients = await api.get('/allrecipients');
    await this.setState({ recipients: recipients.data });
  }

  render() {
    const { recipients, page } = this.state;
    return (
      <Container>
        <Titulo>
          <h1>Gerenciando destinatários</h1>
        </Titulo>
        <ContainerOpcoes>
          <div>
            <MdSearch size={20} color="#999999" />
            <input
              type="text"
              placeholder="Buscar por destinatários"
              onChange={e => this.searchRecipient(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => history.push('/CreateRecipient')}
          >
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
        </ContainerOpcoes>
        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Nome</strong>
            <strong>Endereço</strong>
            <strong>Ações</strong>
          </section>
          {recipients.map(recipient => (
            <Recipientitem
              key={recipient.id}
              data={recipient}
              updateRecipient={this.updateList}
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
