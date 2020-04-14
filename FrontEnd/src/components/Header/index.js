import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/fastfeet-logo.png';
import { Container, Content, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const [items] = useState([
    { name: 'ENTREGAS', to: '/Delivery', isSelected: false },
    { name: 'ENTREGADORES', to: '/Courier', isSelected: false },
    { name: 'DESTINATÁRIOS', to: '/Recipient', isSelected: false },
    { name: 'PROBLEMAS', to: '/Problems', isSelected: false },
  ]);

  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          {items.map(i => (
            <NavLink
              activeStyle={{ color: '#444444' }}
              to={i.to}
              style={{
                color: '#999999',
                fontWeight: 'bold',
                marginLeft: '20px',
              }}
            >
              {i.name}
            </NavLink>
          ))}
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                <span>sair do sistema</span>
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
