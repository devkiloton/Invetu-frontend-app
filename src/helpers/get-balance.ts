export default function getBalance(price: number, amount: number) {
  const balance = price * amount;
  return balance.toFixed(2);
}
