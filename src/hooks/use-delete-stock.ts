import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { deleteStockData } from '~/features/investments-data/investments-data-slice';
import { deleteStock } from '~/features/investments/investments-slice';
import { useAuth } from '~/lib/firebase';
import useSnackbar from './use-snackbar';

function useDeleteStock() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const tooltip = useSnackbar();
  return useCallback(
    (ticker: string) => {
      if (auth.currentUser?.uid !== undefined)
        firebaseClient()
          .firestore.investments.stocks.delete(auth.currentUser?.uid, ticker)
          .then(() => {
            dispatch(deleteStock(ticker));
            dispatch(deleteStockData(ticker));
            tooltip('Ação removida com sucesso!');
          });
    },
    [dispatch],
  );
}
export default useDeleteStock;
