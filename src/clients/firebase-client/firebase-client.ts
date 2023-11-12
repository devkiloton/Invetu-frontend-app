import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '~/lib/firebase';

type Stock = {
  ticker: string;
  price: number;
  amount: number;
  date: number;
  currency: string;
  userID: string;
};

export const firebaseClient = () => {
  const firestore = useFirestore();
  const client = {
    firestore: {
      stocks: {
        add: async (data: Stock) => {
          await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
            stocks: arrayUnion({
              ticker: data.ticker,
              price: data.price,
              amount: data.amount,
              date: data.date,
              currency: data.currency,
              userID: data.userID,
            }),
          });
        },
      },
    },
  };
  return client;
};
