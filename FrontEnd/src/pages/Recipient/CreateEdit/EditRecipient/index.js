import React, { Component } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { Container, Header, Data } from '../styles';
import history from '~/services/history';
import api from '~/services/api';

export default class EditRecipient extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nome: '',
      rua: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
      cep: '',
    };

    this.handleUpdateRecipient = async () => {
      const {
        nome,
        rua,
        numero,
        complemento,
        cidade,
        estado,
        cep,
      } = this.state;
      if (
        nome === '' ||
        rua === '' ||
        numero === '' ||
        complemento === '' ||
        cidade === '' ||
        estado === '' ||
        cep === ''
      ) {
        toast.error('Preencha todos os campos para prosseguir!');
      } else {
        try {
          const { match } = this.props;
          await api.put(`/recipients/${match.params.id}`, {
            nome,
            rua,
            numero,
            complemento,
            cidade,
            estado,
            cep,
          });
          toast.success('Destinatário alterado com sucesso!');
          history.goBack();
        } catch (err) {
          console.tron.log(err);
          toast.error('Erro ao processar sua solicitação');
        }
      }
    };
    this.beforeMaskedValueChange = (newState, oldState, userInput) => {
      let { value } = newState;
      let { selection } = newState;
      let cursorPosition = selection ? selection.start : null;
      const { cep } = this.state;
      if (value.endsWith('-') && userInput !== '-' && !cep.endsWith('-')) {
        if (cursorPosition === value.length) {
          cursorPosition--;
          selection = { start: cursorPosition, end: cursorPosition };
        }
        value = value.slice(0, -1);
      }

      return {
        value,
        selection,
      };
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const response = await api.get(`/searchrecipientid/${match.params.id}`);
    this.setState({
      nome: response.data.nome,
      rua: response.data.rua,
      numero: response.data.numero,
      complemento: response.data.complemento,
      cidade: response.data.cidade,
      estado: response.data.estado,
      cep: response.data.cep,
    });
  }

  render() {
    const {
      loading,
      nome,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      cep,
    } = this.state;
    return (
      <Container>
        <Header>
          <h1>Edição de destinatário</h1>
          <div>
            <button type="button" onClick={history.goBack}>
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <p>VOLTAR</p>
            </button>
            <button type="button" onClick={this.handleUpdateRecipient}>
              <MdDone size={20} color="#fff" />
              <p>{loading ? 'Carregando...' : 'SALVAR'}</p>
            </button>
          </div>
        </Header>
        <Data>
          <div>
            <label htmlFor="nome">
              Nome
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={e => this.setState({ nome: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="rua" className="labelRua">
              Rua
              <input
                type="text"
                id="rua"
                name="rua"
                value={rua}
                onChange={e => this.setState({ rua: e.target.value })}
              />
            </label>
            <label htmlFor="numero" className="labelNumero">
              Número
              <input
                type="number"
                id="numero"
                name="numero"
                value={numero}
                onChange={e => this.setState({ numero: e.target.value })}
              />
            </label>
            <label htmlFor="complemento" className="labelComplemento">
              Complemento
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={complemento}
                onChange={e => this.setState({ complemento: e.target.value })}
              />
            </label>
          </div>
          <div className="divEndereco">
            <label htmlFor="cidade" className="labelCidade">
              Cidade
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={cidade}
                onChange={e => this.setState({ cidade: e.target.value })}
              />
            </label>
            <label htmlFor="estado" className="labelEstado">
              Estado
              <input
                type="text"
                id="estado"
                name="estado"
                value={estado}
                onChange={e => this.setState({ estado: e.target.value })}
              />
            </label>
            <label htmlFor="cep" className="labelCep">
              CEP
              <InputMask
                id="cep"
                mask="99999-999"
                maskChar={null}
                value={cep}
                onChange={e => this.setState({ cep: e.target.value })}
                beforeMaskedValueChange={this.beforeMaskedValueChange}
              />
            </label>
          </div>
        </Data>
      </Container>
    );
  }
}

EditRecipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.func,
  }).isRequired,
};
