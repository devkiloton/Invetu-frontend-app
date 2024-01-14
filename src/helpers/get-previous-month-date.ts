import { isNil } from 'lodash-es';

/**
 * Expect to receive a date in string format DD/MM/YYYY and return the string in format DD/MM/YYYY of the previous month
 * @param date - A date in string format DD/MM/YYYY
 */
export const getPreviousMonthDate = (date: string): string => {
  const [day, month, year] = date.split('/');
  const dateObj = new Date(`${year}-${month}-${day}`);
  dateObj.setMonth(dateObj.getMonth() - 1);
  const newDate = dateObj.toLocaleDateString('pt-BR').split(',')[0];
  if (isNil(newDate)) {
    throw new Error();
  }
  return newDate;
};
