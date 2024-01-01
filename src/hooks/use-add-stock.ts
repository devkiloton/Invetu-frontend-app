import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { addStockData } from '~/features/investments-data/investments-data-slice';
import { addStock } from '~/features/investments/investments-slice';
import getBestInterval from '~/helpers/get-best-interval';
import getNearestDateRange from '~/helpers/get-nearest-date-range';
import { useAuth } from '~/lib/firebase';
import useSnackbar from './use-snackbar';

function useAddStock() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const snackbar = useSnackbar();
  return useCallback(
    (stock: Stock) => {
      firebaseClient().firestore.investments.stocks.add({
        ...stock,
        userID: auth.currentUser?.uid!,
      });
      const nearestRange = getNearestDateRange(stock.startDate);
      if (stock.currency === 'BRL') {
        firebaseClient()
          .functions.findHistoryStocksBR(
            [stock.ticker],
            nearestRange,
            getBestInterval(nearestRange),
          )
          .then(res => {
            dispatch(addStockData(res[0].results[0]));
            dispatch(addStock(stock));
            snackbar('Ação adicionada com sucesso!');
          });
      } else {
        // Handle USD
      }
    },
    [dispatch],
  );
}
export default useAddStock;
