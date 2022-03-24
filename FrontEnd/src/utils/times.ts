import format from 'date-fns/format';

export const isPast = (linuxTimestamp: number) => {
  return linuxTimestamp * 1000 < Date.now();
};

export const formatDate = (date: Date, formatter?: string) => {
  return format(date, formatter || 'MMM dd yyyy HH:mm:ss');
};
