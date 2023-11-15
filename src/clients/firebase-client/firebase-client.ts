import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '~/lib/firebase';
import { Investments, Stock } from './models/Investments';

export const firebaseClient = () => {
  const firestore = useFirestore();
  const client = {
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
