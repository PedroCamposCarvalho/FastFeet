import React, { Component } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Container, Header, ContainerForm, DropDown } from '../styles';
import history from '~/services/history';
import api from '~/services/api';

export default class EditDelivery extends Component {
  constructor() {
    super();
    this.state = {
      recipients: [],
      couriers: [],
      selectedRecipient: {},
      selectedCourier: {},
      product: '',
      loading: false,
    };
    this.fetchRecipients = (inputValue, callback) => {
      if (!inputValue) {
        callback([]);
      } else {
        setTimeout(async () => {
          const response = await api.get(`/Recipients/${inputValue}`);
          callback(response.data.recipients);
        }, 1000);
      }
    };
    this.onRecipientChange = selectedRecipient => {
      if (selectedRecipient) {
        this.setState({
          selectedRecipient,
        });
      }
    };
    this.fetchCouriers = (inputValue, callback) => {
      if (!inputValue) {
        callback([]);
      } else {
        setTimeout(async () => {
          const response = await api.get(`/registerCourier/${inputValue}`);
          callback(response.data.courier);
        }, 1000);
      }
    };
    this.onCourierChange = selectedCourier => {
      if (selectedCourier) {
        this.setState({
          selectedCourier,
        });
      }
    };
    this.handleCreateOrder = async () => {
      const { selectedRecipient, selectedCourier, product } = this.state;
      await this.setState({ loading: true });
      if (
        !selectedRecipient.value ||
        !selectedCourier.value ||
        product === ''
      ) {
        toast.error('Preencha todos os campos para continuar!');
        await this.setState({ loading: false });
      } else {
        try {
          const { match } = this.props;
          await api.put(`/updateorder/${match.params.id}`, {
            recipient_id: selectedRecipient.value,
            deliveryman_id: selectedCourier.value,
            product,
          });
          toast.success('Entrega atualizada com sucesso!');
          history.push('/Delivery');
        } catch (error) {
          toast.error('Falha ao processar a sua solicitação');
          await this.setState({ loading: false });
        }
      }
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const response = await api.get(`/order/${match.params.id}`);

    const recipient = await api.get('/Recipients');
    const courier = await api.get('/registerCourier');

    this.setState({
      product: response.data.product,
      selectedRecipient: {
        value: response.data.recipient_id,
        label: response.data.Recipient.nome,
      },
      selectedCourier: {
        value: response.data.deliveryman_id,
        label: response.data.Courier.name,
      },
      recipients: recipient.data,
      couriers: courier.data,
    });
  }

  render() {
    const {
      recipients,
      couriers,
      selectedRecipient,
      selectedCourier,
      product,
      loading,
    } = this.state;
    return (
      <Container>
        <Header>
          <h1>Edição de encomendas</h1>
          <div>
            <button type="button" onClick={history.goBack}>
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <p>VOLTAR</p>
            </button>
            <button type="button" onClick={this.handleCreateOrder}>
              <MdDone size={20} color="#fff" />
              <p>{loading ? 'Carregando...' : 'SALVAR'}</p>
            </button>
          </div>
        </Header>
        <ContainerForm>
          <div className="divSelects">
            <span>
              Destinatário
              <DropDown
                name="destinatarios"
                value={selectedRecipient}
                loadOptions={this.fetchRecipients}
                placeholder="Destinatários"
                onChange={e => {
                  this.onRecipientChange(e);
                }}
                defaultOptions={recipients}
              />
            </span>
            <span>
              Entregador
              <DropDown
                name="entregador"
                value={selectedCourier}
                loadOptions={this.fetchCouriers}
                placeholder="Destinatários"
                onChange={e => {
                  this.onCourierChange(e);
                }}
                defaultOptions={couriers}
              />
            </span>
          </div>
          <label
            htmlFor="produto"
            style={{ width: '100%' }}
            className="inputProduct"
          >
            Nome do produto
            <input
              type="text"
              id="produto"
              name="produto"
              value={product}
              style={{ width: '100%' }}
              onChange={e => this.setState({ product: e.target.value })}
            />
          </label>
        </ContainerForm>
      </Container>
    );
  }
}

EditDelivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.func,
  }).isRequired,
};
