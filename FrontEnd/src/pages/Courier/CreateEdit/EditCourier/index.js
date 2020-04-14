import React, { Component } from 'react';
import { MdKeyboardArrowLeft, MdDone, MdImage } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Container, Header, Info } from '../styles';
import history from '~/services/history';
import api from '~/services/api';

export default class EditCourier extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      image: { id: '', url: null },
      name: '',
      email: '',
    };
    this.handleFileUpload = async event => {
      const data = new FormData();
      data.append('file', event.target.files[0]);
      const response = await api.post('files', data);
      const { id, url } = response.data;
      this.setState({ image: { id, url } });
    };
    this.handleUpdateCourier = async () => {
      const { name, email, image } = this.state;
      if (name === '' || email === '' || image.id === '') {
        toast.error('Preencha todos os campos para prosseguir!');
      } else {
        try {
          const { match } = this.props;
          await api.put(`/couriers/${match.params.id}`, {
            name,
            email,
            avatar_id: image.id,
          });
          toast.success('Entregador atualizado com sucesso!');
          history.goBack();
        } catch (err) {
          toast.error('Erro ao processar sua solicitação');
        }
      }
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const response = await api.get(`/couriers/${match.params.id}`);
    await this.setState({
      name: response.data.name,
      email: response.data.email,
    });
    if (response.data.File) {
      await this.setState({
        image: { id: response.data.avatar_id, url: response.data.File.url },
      });
    }
  }

  render() {
    const { loading, image, name, email } = this.state;
    return (
      <Container>
        <Header>
          <h1>Edição de entregadores</h1>
          <div>
            <button type="button" onClick={history.goBack}>
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <p>VOLTAR</p>
            </button>
            <button type="button" onClick={this.handleUpdateCourier}>
              <MdDone size={20} color="#fff" />
              <p>{loading ? 'Carregando...' : 'SALVAR'}</p>
            </button>
          </div>
        </Header>
        <Info>
          <label htmlFor="avatar" className="labelInput">
            {image.url ? (
              <img src={image.url} alt="" />
            ) : (
              <div className="divImagem">
                <MdImage size={50} color="#dddddd" />
                <p>Adicionar foto</p>
              </div>
            )}
            <input
              type="file"
              id="avatar"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => this.handleFileUpload(e)}
            />
          </label>
          <label htmlFor="nome" className="labelText">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <label htmlFor="email" className="labelText">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </Info>
      </Container>
    );
  }
}
EditCourier.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.func,
  }).isRequired,
};
