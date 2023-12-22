import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { addStockData } from '~/features/investments-data/investments-data-slice';
import { addStock } from '~/features/investments/investments-slice';
import getBestInterval from '~/helpers/get-best-interval';
import getNearestDateRange from '~/helpers/get-nearest-date-range';

function useAddStock() {
  const dispatch = useDispatch();
  return useCallback(
    (stock: Stock) => {
      firebaseClient().firestore.investments.stocks.add(stock);
      const nearestRange = getNearestDateRange(stock.startDate);
      firebaseClient()
        .functions.findHistoryStocksBR(
          [stock.ticker],
          nearestRange,
          getBestInterval(nearestRange),
        )
        .then(res => {
          dispatch(addStockData(res[0].results[0]));
          dispatch(addStock(stock));
        });
    },
    [dispatch],
  );
}
export default useAddStock;
