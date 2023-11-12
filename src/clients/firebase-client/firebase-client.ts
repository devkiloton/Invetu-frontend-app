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
            await updateDoc(doc(firestore, 'investments', `${data.userID}`), {
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
