import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './styles';

export default function FooterPages({ page, clickPlus, clickMinus }) {
  return (
    <Container>
      <button type="button" onClick={() => clickMinus()}>
        <MdKeyboardArrowLeft size={40} color="#666" />
      </button>

      <span>Página {page}</span>

      <button type="button" onClick={() => clickPlus()}>
        <MdKeyboardArrowRight size={40} color="#666" />
      </button>
    </Container>
  );
}
