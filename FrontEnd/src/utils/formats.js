/* eslint-disable no-plusplus */
import { format } from 'date-fns';

export function formatarData(data) {
  if (data !== null) {
    const novaData = new Date(data);
    return format(novaData, 'dd/MM/yyyy');
  }
  return '--/--/----';
}

export function obterUfCidade(cidade) {
  const cidadeSplit = cidade.split(' ');
  let retorno = '';
  let i;
  for (i = 0; i < cidadeSplit.length; i++) {
    retorno += cidadeSplit[i][0];
  }
  return retorno;
}

export function CalcularStatus(start_date, end_date, canceledAt) {
  if (canceledAt) {
    return 'CANCELADA';
  }
  if (end_date) {
    return 'ENTREGUE';
  }
  if (start_date) {
    return 'RETIRADA';
  }
  return 'PENDENTE';
}
