export default function getProfit(basePrice: number, currentPrice: number) {
  const percentProfit = (currentPrice / basePrice - 1) * 100;
  return percentProfit.toFixed(2);
}
