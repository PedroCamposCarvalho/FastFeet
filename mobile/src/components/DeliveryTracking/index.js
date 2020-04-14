import React from 'react';
import { Image } from 'react-native';
import Aguardando from '~/assets/Aguardando.png';
import Retirada from '~/assets/Retirada.png';
import Entregue from '~/assets/Entregue.png';

export default function DeliveryTracking({ status }) {
  if (status === 'Aguardando') {
    return (
      <Image
        source={Aguardando}
        style={{
          transform: [{ scale: 0.5 }],
        }}
      />
    );
  }
  if (status === 'Retirada') {
    return (
      <Image
        source={Retirada}
        style={{
          transform: [{ scale: 0.5 }],
        }}
      />
    );
  }
  return (
    <Image
      source={Entregue}
      style={{
        transform: [{ scale: 0.5 }],
      }}
    />
  );
}
