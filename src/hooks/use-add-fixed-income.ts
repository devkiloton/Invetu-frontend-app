import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { FixedIncome } from '~/clients/firebase-client/models/Investments';
import { addFixedIncome } from '~/features/investments/investments-slice';
import { useAuth } from '~/lib/firebase';
import useSnackbar from './use-snackbar';

function useAddFixedIncome() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const snackbar = useSnackbar();
  return useCallback(
    (investment: FixedIncome) => {
      firebaseClient()
        .firestore.investments.fixedIncomes.add({
          ...investment,
          userID: auth.currentUser?.uid!,
        })
        .then(() => {
          dispatch(addFixedIncome(investment));
          snackbar('Investimento adicionado com sucesso!');
        });
    },
    [dispatch],
  );
}
export default useAddFixedIncome;
