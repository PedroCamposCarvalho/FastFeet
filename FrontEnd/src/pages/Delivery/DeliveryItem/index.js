import React from 'react';
import PropTypes from 'prop-types';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, ContainerBotoes } from './styles';
import Status from '../Status';
import Options from '~/components/Options';
import DeliveryModal from '../Modal';
import api from '~/services/api';
import history from '~/services/history';

export default function DeliveryItem({ data, updateDelivery }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir esta entrega?'
    );
    if (confirm) {
      try {
        await api.delete(`/orders/${data.id}`);
        updateDelivery();
        toast.success('Entrega excluída com sucesso!');
      } catch (err) {
        toast.error('Essa entrega não pode ser excluída!');
      }
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.Recipient.nome}</small>
      <small>{data.product}</small>
      <small>{data.Recipient.cidade}</small>
      <small>{data.Recipient.estado}</small>
      <Status text={data.status} />
      <Options>
        <ContainerBotoes>
          <div>
            <DeliveryModal order={data} />
          </div>
          <hr />
          <button
            type="button"
            onClick={() => history.push(`/EditDelivery/${data.id}`)}
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

DeliveryItem.propTypes = {
  updateDelivery: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    recipient_id: PropTypes.number,
    deliveryman_id: PropTypes.number,
    product: PropTypes.string,
    Recipient: PropTypes.shape({
      nome: PropTypes.string,
      cidade: PropTypes.string,
      estado: PropTypes.string,
    }),
    Courier: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
