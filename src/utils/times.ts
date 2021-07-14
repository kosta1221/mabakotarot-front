import { DateTime } from 'luxon';

export const startOfLocalDay = new DateTime(
  DateTime.local().set({ hour: 0, minute: 0 }),
).toFormat('yyyy-MM-dd HH:mm');

export const currentLocalTime = new DateTime(DateTime.local()).toFormat(
  'yyyy-MM-dd HH:mm',
);

export const yesterday = new DateTime(
  DateTime.local().set({ day: new Date().getDate() - 1 }),
).toFormat('yyyy-MM-dd HH:mm');
