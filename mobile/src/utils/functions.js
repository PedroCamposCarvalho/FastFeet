import { format } from 'date-fns';

export function formatarData(data) {
  if (data !== null) {
    const formatardata = String(data.substring(0, data.length - 5));

    const novaData = new Date(formatardata);
    return format(novaData, 'dd/MM/yyyy');
  }
  return '--/--/----';
}

export function firstTwoLetters(name) {
  const NomeArray = name.split(' ');
  console.tron.log(NomeArray.length);
  if (NomeArray.length > 1) {
    const retorno = NomeArray[0][0] + NomeArray[1][0];
    return retorno;
  }
  return name;
}

export function calcularStatus(start_date, end_date, canceled_at) {
  if (canceled_at !== null) {
    return 'Cancelada';
  }
  if (end_date !== null) {
    return 'Entregue';
  }
  if (start_date !== null) {
    return 'Retirada';
  }
  return 'Pendente';
}
