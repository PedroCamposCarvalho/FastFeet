import React from 'react';
import { toast } from 'react-toastify';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, ContainerBotoes, Imagem } from './styles';
import Options from '~/components/Options';
import api from '~/services/api';
import history from '~/services/history';

export default function CourierItem({ data, updateCourier }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir este entregador?'
    );
    if (confirm) {
      try {
        await api.delete(`/couriers/${data.id}`);
        updateCourier();
        toast.success('Entregador excluído com sucesso!');
      } catch (err) {
        toast.error(
          'Esse entregador não pode ser excluído! Existem encomendas associadas à ele'
        );
      }
    }
  }
  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.File ? <Imagem src={data.File.url} /> : <></>}</small>
      <small>{data.name}</small>
      <small>{data.email}</small>
      <Options>
        <ContainerBotoes>
          <button
            type="button"
            onClick={() => history.push(`/EditCourier/${data.id}`)}
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

CourierItem.propTypes = {
  updateCourier: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    File: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
