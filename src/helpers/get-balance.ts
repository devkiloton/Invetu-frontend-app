/**
 * Get the balance of a stock
 * @param price - The price of the stock
 * @param amount - The amount of stocks
 * @returns The balance of the stock
 */
const getBalance = (price: number, amount: number) => {
  const balance = price * amount;
  return balance.toFixed(2);
};

export default getBalance;
