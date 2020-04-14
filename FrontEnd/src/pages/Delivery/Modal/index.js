import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import ModalForm from '~/components/Modal';
import { obterUfCidade, formatarData } from '~/utils/formats';

export default function Modal({ order }) {
  return (
    <ModalForm>
      <Container>
        <p>Informações da encomenda</p>
        <span>
          {order.Recipient.rua}, {order.Recipient.numero},{' '}
          {order.Recipient.complemento}
        </span>
        <span>
          {order.Recipient.cidade} - {obterUfCidade(order.Recipient.estado)}
        </span>
        <span>{order.Recipient.cep}</span>
        <hr />
        <p>Datas</p>
        <div>
          <p>Retirada: </p>
          <span>{formatarData(order.start_date)}</span>
          <br />
          <p>Entrega: </p>
          <span>{formatarData(order.end_date)}</span>
        </div>
        <hr />
        <p>Assinatura do destinatário</p>
        {order.File ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={order.File.url}
              alt="Assinatura"
              style={{ maxWidth: '50%', maxHeight: '50%' }}
            />
          </div>
        ) : (
          <></>
        )}
      </Container>
    </ModalForm>
  );
}

Modal.propTypes = {
  order: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    Recipient: PropTypes.shape({
      name: PropTypes.string,
      rua: PropTypes.string,
      numero: PropTypes.number,
      cidade: PropTypes.string,
      estado: PropTypes.string,
      cep: PropTypes.string,
      complemento: PropTypes.string,
    }),
    File: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
