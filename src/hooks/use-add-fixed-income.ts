import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { FixedIncome } from '~/clients/firebase-client/models/Investments';
import { addFixedIncome } from '~/features/investments/investments-slice';
import { useAuth } from '~/lib/firebase';

function useAddFixedIncome() {
  const dispatch = useDispatch();
  const auth = useAuth();
  return useCallback(
    (investment: FixedIncome) => {
      firebaseClient()
        .firestore.investments.fixedIncomes.add({
          ...investment,
          userID: auth.currentUser?.uid!,
        })
        .then(() => {
          dispatch(addFixedIncome(investment));
        });
    },
    [dispatch],
  );
}
export default useAddFixedIncome;
