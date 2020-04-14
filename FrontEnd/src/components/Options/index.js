import React from 'react';
import Popup from 'reactjs-popup';
import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, PopUpButton } from './styles';

export default function Options({ children }) {
  return (
    <Container>
      <Popup
        trigger={
          <PopUpButton type="button">
            <MdMoreHoriz color="#C6C6C6" size={25} />
          </PopUpButton>
        }
        position="bottom center"
        contentStyle={{
          width: '200px',
          borderRadius: '4px',
        }}
      >
        {children}
      </Popup>
    </Container>
  );
}
Options.propTypes = {
  children: PropTypes.element.isRequired,
};
