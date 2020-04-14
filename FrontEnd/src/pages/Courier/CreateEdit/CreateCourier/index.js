import React, { Component } from 'react';
import { MdKeyboardArrowLeft, MdDone, MdImage } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Header, Info } from '../styles';
import history from '~/services/history';
import api from '~/services/api';

export default class CreateCourier extends Component {
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
    this.handleCreateCourier = async () => {
      const { name, email, image } = this.state;
      if (name === '' || email === '' || image.id === '') {
        toast.error('Preencha todos os campos para prosseguir!');
      } else {
        try {
          const response = await api.post('/couriers', {
            name,
            email,
          });
          const { id } = response.data;
          await api.put(`/couriers/${id}`, {
            id,
            name,
            email,
            avatar_id: image.id,
          });
          toast.success('Entregador criado com sucesso!');
          history.goBack();
        } catch (err) {
          console.tron.log(err);
          toast.error('Erro ao processar sua solicitação');
        }
      }
    };
  }

  render() {
    const { loading, image, name, email } = this.state;
    return (
      <Container>
        <Header>
          <h1>Cadastro de entregadores</h1>
          <div>
            <button type="button" onClick={history.goBack}>
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <p>VOLTAR</p>
            </button>
            <button type="button" onClick={this.handleCreateCourier}>
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
