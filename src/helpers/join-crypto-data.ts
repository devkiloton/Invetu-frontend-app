import { isNil } from 'lodash-es';
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
      const cryptoCurrency = cryptoMap[cryptoKey];
      if (isNil(cryptoCurrency)) return;
      // calculate the new average price considering the new amount
      const newAveragePrice =
        (cryptoCurrency.price * cryptoCurrency.amount + price * amount) /
        (cryptoCurrency.amount + amount);
      cryptoCurrency.price = newAveragePrice;

      cryptoCurrency.amount += amount;
      cryptoCurrency.startDate = new Date(
        Math.min(
          new Date(cryptoCurrency.startDate).getTime(),
          new Date(startDate).getTime(),
        ),
      ).toISOString();
    }
  });

  const cryptoAnalysis: Array<Crypto> = [];

  for (const key in cryptoMap) {
    const cryptoObj = cryptoMap[key];
    if (isNil(cryptoObj)) {
      throw new Error();
    }
    cryptoAnalysis.push(cryptoObj);
  }

  return cryptoAnalysis;
};
