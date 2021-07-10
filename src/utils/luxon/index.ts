import { DateTime } from 'luxon';

export const turnDateStringIntoPresentableFormat = (
  dateString: string,
  withBet: boolean = false,
) => {
  const dateTimeFromDateString = new DateTime.fromFormat(
    dateString,
    'yyyy-MM-dd HH:mm',
  ).setLocale('he');

  const presentableDateString = withBet
    ? dateTimeFromDateString.toFormat('dd בMMM yyyy HH:mm')
    : dateTimeFromDateString.toFormat('dd MMM yyyy HH:mm');

  return presentableDateString;
};
