export const getIsoDate = (date: string | Date) =>
  new Date(date).toISOString().split('T')[0];
