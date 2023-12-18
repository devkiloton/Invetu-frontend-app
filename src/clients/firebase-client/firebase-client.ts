import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '~/lib/firebase';
import { Investments, Stock } from './models/Investments';
import { Interval } from '~/types/interval';
import { Range } from '~/types/range';
import { HistoryStockBR } from './models/history-stock-br';

export const firebaseClient = () => {
  const FIREBASE_FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL;
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

        const joinResults = data.flatMap(
          (item: HistoryStockBR) => item.results,
        );
        // Case when the API returns 2 arrays(it happens when the stocks requested are more than 20) we'll join them
        // PS: We should apply this to all the other methods
        data[0].results = joinResults;
        if (data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            delete data[i];
          }
        }
        return data;
      },
      fuzzyStocksBR: async (ticker: string): Promise<Array<string>> => {
        const res = await fetch(
          `${FIREBASE_FUNCTIONS_URL}/fuzzyStocksBR?id=${ticker}`,
        );
        const data = await res.json();
        return data.stocks;
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
          add: async (data: Stock): Promise<void> => {
            const investments = await client.firestore.investments.get(
              data.userID,
            );
            const stock: Stock = {
              ticker: data.ticker,
              price: data.price,
              amount: data.amount,
              startDate: data.startDate,
              currency: data.currency,
              userID: data.userID,
              type: data.type,
            };
            await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
              investedAmount:
                investments.investedAmount + data.price * data.amount,
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
              investedAmount:
                investments.investedAmount - stock.price * stock.amount,
              stocks: stocksUpdated,
            });
          },
        },
      },
    },
  };
  return client;
};
