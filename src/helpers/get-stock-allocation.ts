/**
 * Returns the allocation % of the stock in the portfolio
 * @param amount - The amount of stocks
 * @param price - The current price of the stock
 * @param investedAmount - The amount of money invested in the whole portfolio
 * @returns The allocation of the stock in the portfolio
 */
const getStockAllocation = (
  amount: number,
  price: number,
  investedAmount: number,
) => {
  const percent = ((amount * price) / investedAmount) * 100;
  return percent.toFixed(2);
};

export default getStockAllocation;
