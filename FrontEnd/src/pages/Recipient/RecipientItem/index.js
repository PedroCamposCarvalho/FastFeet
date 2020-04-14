import React from 'react';
import { toast } from 'react-toastify';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, ContainerBotoes } from './styles';
import Options from '~/components/Options';
import api from '~/services/api';
import history from '~/services/history';

export default function RecipientItem({ data, updateRecipient }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir este destinatário?'
    );
    if (confirm) {
      try {
        await api.delete(`/recipients/${data.id}`);
        updateRecipient();
        toast.success('Destinatário excluído com sucesso!');
      } catch (err) {
        toast.error(
          'Esse destinatário não pode ser excluído! Existem encomendas associadas à ele'
        );
      }
    }
  }
  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.nome}</small>
      <small>{`${data.rua}, ${data.numero}, ${data.cidade} - ${data.estado}`}</small>
      <Options>
        <ContainerBotoes>
          <button
            type="button"
            onClick={() => history.push(`/EditRecipient/${data.id}`)}
          >
            <MdCreate size={20} color="#4D85EE" />
            Editar
          </button>
          <hr />
          <button type="button" onClick={() => handleDelete()}>
            <MdDeleteForever size={20} color="#DE3B3B" />
            Excluir
          </button>
        </ContainerBotoes>
      </Options>
    </Container>
  );
}

RecipientItem.propTypes = {
  updateRecipient: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    nome: PropTypes.string,
    rua: PropTypes.string,
    numero: PropTypes.string,
    cidade: PropTypes.string,
    estado: PropTypes.string,
  }).isRequired,
};
