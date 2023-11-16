export default function getStockAllocation(
  amount: number,
  price: number,
  investedAmount: number,
) {
  const percent = ((amount * price) / investedAmount) * 100;
  return percent.toFixed(2);
}
