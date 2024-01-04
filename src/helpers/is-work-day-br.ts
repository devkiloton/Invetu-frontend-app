export const isWorkDayBr = (date: Date): boolean => {
  const dayWeek = date.getDay();
  const month = date.getMonth();
  const dayMonth = date.getDate();
  if (dayWeek === 0 || dayWeek === 6) {
    return false;
  } else if (month === 0 && dayMonth === 1) {
    // Ano Novo
    return false;
  } else if (month === 2 && dayMonth === 29) {
    // Paixão de Cristo
    return false;
  } else if (month === 3 && dayMonth === 21) {
    // Tiradentes
    return false;
  } else if (month === 4 && dayMonth === 1) {
    // Dia do Trabalhador
    return false;
  } else if (month === 8 && dayMonth === 7) {
    // Independência do Brasil
    return false;
  } else if (month === 9 && dayMonth === 12) {
    // Nossa Senhora Aparecida
    return false;
  } else if (month === 10 && dayMonth === 2) {
    // Finados
    return false;
  } else if (month === 10 && dayMonth === 15) {
    // Proclamação da República
    return false;
  } else if (month === 10 && dayMonth === 20) {
    // Dia da Consciência Negra
    if (date.getFullYear() < 2023) return true;
    return false;
  } else if (month === 11 && dayMonth === 25) {
    // Natal
    return false;
  } else {
    return true;
  }
};
