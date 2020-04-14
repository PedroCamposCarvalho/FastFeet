import React from 'react';
import PropTypes from 'prop-types';

import { MdFiberManualRecord } from 'react-icons/md';

import { Container, Content } from './styles';

export default function Status({ text }) {
  function setColor() {
    if (text === 'CANCELADA') {
      return { color: '#DE3B3B', background: '#FAB0B0' };
    }
    if (text === 'ENTREGUE') {
      return { color: '#2CA42B', background: '#DFF0DF' };
    }
    if (text === 'RETIRADA') {
      return { color: '#4D85EE', background: '#BAD2FF' };
    }
    return { color: '#C1BC35', background: '#F0F0DF' };
  }
  const colors = setColor(text);
  return (
    <Container>
      <Content color={colors.color} background={colors.background}>
        <MdFiberManualRecord size={15} color={colors.color} />
        <p>{text}</p>
      </Content>
    </Container>
  );
}

Status.propTypes = {
  text: PropTypes.string.isRequired,
};
