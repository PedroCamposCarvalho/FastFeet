import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import ModalForm from '~/components/Modal';

export default function Modal({ problem }) {
  return (
    <ModalForm>
      <Container>
        <p>VISUALIZAR PROBLEMA</p>
        <span>{problem.description}</span>
      </Container>
    </ModalForm>
  );
}

Modal.propTypes = {
  problem: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
};
