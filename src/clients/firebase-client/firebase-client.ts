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
            const investments = await client.firestore.investments.get(data.userID);
            const stock = investments.stocks.find(stock => stock.ticker === data.ticker);
            // If stock already exists, update it summing the amount and dividing the price by the new amount
            if (stock) {
              const newAmount = stock.amount + data.amount;
              const newPrice = (stock.price * stock.amount + data.price * data.amount) / newAmount;
              const newStocks = investments.stocks.map(stock => {
                if (stock.ticker === data.ticker) {
                  return {
                    ...stock,
                    amount: newAmount,
                    price: newPrice,
                  };
                }
                return stock;
              });
              await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
                investedAmount: investments.investedAmount + data.price * data.amount,
                stocks: newStocks,
              });
              return;
            }
            await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
              investedAmount: investments.investedAmount + data.price * data.amount,
              stocks: arrayUnion({
                ticker: data.ticker,
                price: data.price,
                amount: data.amount,
                date: data.startDate,
                currency: data.currency,
                userID: data.userID,
              }),
            });
          },
          get: async (userID: string): Promise<Investments> => {
            const docRef = doc(firestore, 'investments', `${userID}`);
            const docSnap = await getDoc(docRef);
            return docSnap.data() as Investments;
          },
        },
      },
    },
  };
  return client;
};
