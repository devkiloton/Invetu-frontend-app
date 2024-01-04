import { firebaseClient } from '~/clients/firebase-client/firebase-client';

export const getProfitCdi = async (
  startDate: Date,
  endDate: Date,
  amount: number,
  tax: number,
): Promise<number> => {
  return await firebaseClient().functions.getProfitCdi(
    startDate.getTime(),
    endDate.getTime(),
    amount,
    tax,
  );
};
