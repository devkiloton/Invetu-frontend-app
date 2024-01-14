import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '~/lib/firebase';
import { Crypto, FixedIncome, Investments, Stock } from './models/Investments';
import { Interval } from '~/types/interval';
import { Range } from '~/types/range';
import { HistoryStockBR } from './models/history-stock-br';
import { DataCryptos } from './models/data-cryptos';
import { StatusCryptos } from './models/status-cryptos';
import { Fiats } from './models/fiats';
import { FuzzyUS } from './models/fuzzy-us';
import { HistoryStockUS } from './models/history-stock-us';

export const firebaseClient = () => {
  const FIREBASE_FUNCTIONS_URL = import.meta.env['VITE_FIREBASE_FUNCTIONS_URL'];
  const firestore = useFirestore();
  const client = {
    functions: {
      findHistoryStocksBR: async (
        tickers: Array<string>,
        range: Range,
        interval: Interval,
      ): Promise<Array<HistoryStockBR>> => {
        const joinedStocks = tickers.map(ticker => ticker);
        const unifyStocks = new Set(joinedStocks);
        const parametrizedTickers = Array.from(unifyStocks).join(',');
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/findHistoryStocksBR?ids=${parametrizedTickers}&range=${range}&interval=${interval}`,
        );
        const data = await res.json();
        return data;
      },
      findHistoryStocksUS: async (ids: string[]): Promise<HistoryStockUS> => {
        const parametrizedIds = ids.join(',');
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/findHistoryStocksUS/?ids=${parametrizedIds}&outputsize=full`,
        );
        const data = await res.json();
        return data;
      },
      fuzzyStocksBR: async (ticker: string): Promise<Array<string>> => {
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/fuzzyStocksBR?id=${ticker}`,
        );
        const data = await res.json();
        return data.stocks;
      },
      fuzzyStocksUS: async (ticker: string): Promise<FuzzyUS> => {
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/fuzzyStocksUS?id=${ticker}`,
        );
        const data = (await res.json()) as FuzzyUS;

        return data;
      },
      findCryptosData: async (
        ids: Array<string>,
        period: string,
      ): Promise<DataCryptos> => {
        const parametrizedIds = ids.join(',');
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/findCryptosData/?ids=${parametrizedIds}&period=${period}`,
        );
        const data = await res.json();
        return data;
      },
      findAllCryptos: async (): Promise<StatusCryptos> => {
        const res = await fetch(`${FIREBASE_FUNCTIONS_URL}/findAllCryptos`);
        const data = await res.json();
        return data;
      },
      findFiats: async (): Promise<Fiats> => {
        const res = await fetch(`${FIREBASE_FUNCTIONS_URL}/findFiats`);
        const data = await res.json();
        return data;
      },
      getProfitCdi: async (
        startDate: number,
        endDate: number,
        amount: number,
        tax: number,
      ): Promise<number> => {
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/getProfitCdi/?startDate=${startDate}&endDate=${endDate}&amount=${amount}&tax=${tax}`,
        );
        const data = await res.json();
        return data;
      },
    },
    firestore: {
      investments: {
        get: async (userID: string): Promise<Investments> => {
          const docRef = doc(firestore, 'investments', `${userID}`);
          const docSnap = await getDoc(docRef);
          return docSnap.data() as Investments;
        },
        stocks: {
          add: async (data: Stock & { userID: string }): Promise<void> => {
            const investments = await client.firestore.investments.get(
              data.userID,
            );
            const stock: Stock = {
              ticker: data.ticker,
              price: Number(data.price),
              amount: data.amount,
              startDate: data.startDate,
              currency: data.currency,
              type: data.type,
            };
            await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
              investedAmount: Number(
                (investments.investedAmount + data.price * data.amount).toFixed(
                  2,
                ),
              ),
              stocks: arrayUnion(stock),
            });
          },
          get: async (userID: string): Promise<Investments> => {
            const docRef = doc(firestore, 'investments', `${userID}`);
            const docSnap = await getDoc(docRef);
            return docSnap.data() as Investments;
          },
          delete: async (userID: string, ticker: string): Promise<void> => {
            const investments = await client.firestore.investments.get(userID);
            const stock = investments.stocks.find(
              stock => stock.ticker === ticker,
            );
            const stocksUpdated = investments.stocks.filter(
              stock => stock.ticker !== ticker,
            );
            if (!stock) return;
            await updateDoc(doc(firestore, 'investments', `${userID}`), {
              investedAmount: Number(
                investments.investedAmount - stock.price * stock.amount,
              ),
              stocks: stocksUpdated,
            });
          },
        },
        fixedIncomes: {
          add: async (
            data: FixedIncome & { userID: string },
          ): Promise<void> => {
            const investments = await client.firestore.investments.get(
              data.userID,
            );
            const fixedIncome: FixedIncome = {
              name: data.name,
              amount: data.amount,
              rate: data.rate,
              index: data.index,
              currency: data.currency,
              startDate: data.startDate,
              endDate: data.endDate,
            };
            await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
              investedAmount: Number(investments.investedAmount + data.amount),
              fixedIncomes: arrayUnion(fixedIncome),
            });
          },
          delete: async (userID: string, name: string): Promise<void> => {
            const investments = await client.firestore.investments.get(userID);
            const fixedIncome = investments.fixedIncomes.find(
              fixedIncome => fixedIncome.name === name,
            );
            const fixedIncomesUpdated = investments.fixedIncomes.filter(
              fixedIncome => fixedIncome.name !== name,
            );
            if (!fixedIncome) return;
            await updateDoc(doc(firestore, 'investments', `${userID}`), {
              investedAmount: Number(
                investments.investedAmount - fixedIncome.amount,
              ),
              fixedIncomes: fixedIncomesUpdated,
            });
          },
        },
        cryptoCurrencies: {
          add: async (data: Crypto & { userID: string }): Promise<void> => {
            const investments = await client.firestore.investments.get(
              data.userID,
            );
            const crypto: Crypto = {
              name: data.name,
              ticker: data.ticker,
              price: Number(data.price),
              amount: data.amount,
              startDate: data.startDate,
              currency: data.currency,
            };
            await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
              investedAmount: Number(
                investments.investedAmount + data.price * data.amount,
              ),
              cryptos: arrayUnion(crypto),
            });
          },
          delete: async (userID: string, ticker: string): Promise<void> => {
            const investments = await client.firestore.investments.get(userID);
            const crypto = investments.cryptos.find(
              crypto => crypto.ticker === ticker,
            );
            const cryptosUpdated = investments.cryptos.filter(
              crypto => crypto.ticker !== ticker,
            );
            if (!crypto) return;
            await updateDoc(doc(firestore, 'investments', `${userID}`), {
              investedAmount: Number(
                investments.investedAmount - crypto.price * crypto.amount,
              ),
              cryptos: cryptosUpdated,
            });
          },
        },
      },
    },
  };
  return client;
};
