/**
 * Calculates the profit in percentage
 * @param basePrice - The price at which the stock was bought
 * @param currentPrice - The current price of the stock
 * @returns - The profit in percentage
 */
const getProfit = (basePrice: number, currentPrice: number): string => {
  const percentProfit = (currentPrice / basePrice - 1) * 100;
  return percentProfit.toFixed(2);
};

export default getProfit;
