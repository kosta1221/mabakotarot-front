export function pad(n) {
  return n < 10 ? '0' + n : n;
}

export function numFormatter(value: number) {
  let mm;
  switch (value % 4) {
    case 0:
      mm = '00';
      break;
    case 1:
      mm = '15';
      break;
    case 2:
      mm = '30';
      break;
    case 3:
      mm = '45';
      break;

    default:
      break;
  }
  return `${pad(Math.floor(value / 4))}:${mm}`;
}

export function getNumFromHHMM(hhcolonmm: string) {
  const hour = hhcolonmm.split(':')[0];
  const minute = hhcolonmm.split(':')[1];

  let value = 4 * +hour;

  switch (minute) {
    case '00':
      value += 0;
      break;
    case '15':
      value += 1;
      break;
    case '30':
      value += 2;
      break;
    case '45':
      value += 3;
      break;

    default:
      break;
  }

  return value;
}
