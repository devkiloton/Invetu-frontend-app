import { Crypto } from '~/clients/firebase-client/models/Investments';

export const joinCryptoData = (cryptos: Array<Crypto>): Array<Crypto> => {
  const cryptoMap: Record<string, Crypto> = {};

  cryptos.forEach(crypto => {
    const { ticker, price, amount, startDate, currency, name } = crypto;
    const cryptoKey = `${ticker}_${currency}`;

    if (!cryptoMap[cryptoKey]) {
      cryptoMap[cryptoKey] = {
        ticker,
        price,
        amount,
        startDate,
        currency,
        name,
      };
    } else {
      // calculate the new average price considering the new amount
      const newAveragePrice =
        (cryptoMap[cryptoKey].price * cryptoMap[cryptoKey].amount +
          price * amount) /
        (cryptoMap[cryptoKey].amount + amount);
      cryptoMap[cryptoKey].price = newAveragePrice;

      cryptoMap[cryptoKey].amount += amount;
      cryptoMap[cryptoKey].startDate = new Date(
        Math.min(
          new Date(cryptoMap[cryptoKey].startDate).getTime(),
          new Date(startDate).getTime(),
        ),
      ).toISOString();
    }
  });

  const cryptoAnalysis = [];

  for (const key in cryptoMap) {
    cryptoAnalysis.push(cryptoMap[key]);
  }

  return cryptoAnalysis;
};
