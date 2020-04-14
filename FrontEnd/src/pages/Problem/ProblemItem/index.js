import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, ContainerBotoes } from './styles';
import Options from '~/components/Options';
import ProblemModal from '../Modal';
import api from '~/services/api';

export default function DeliveryItem({ data, updateProblem }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir esta entrega?'
    );
    if (confirm) {
      try {
        await api.delete(`/orders/${data.delivery_id}`);
        updateProblem();
        toast.success('Entrega excluída com sucesso!');
      } catch (err) {
        toast.error('Essa entrega não pode ser excluída!');
      }
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.description}</small>
      <Options>
        <ContainerBotoes>
          <div>
            <ProblemModal problem={data} />
          </div>
          <hr />
          <button type="button" onClick={() => handleDelete()}>
            <MdDeleteForever size={20} color="#DE3B3B" />
            Cancelar encomenda
          </button>
        </ContainerBotoes>
      </Options>
    </Container>
  );
}

DeliveryItem.propTypes = {
  updateProblem: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    delivery_id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
