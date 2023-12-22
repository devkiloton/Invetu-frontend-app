import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteStockData } from '~/features/investments-data/investments-data-slice';
import { deleteStock } from '~/features/investments/investments-slice';

function useDeleteStock() {
  const dispatch = useDispatch();
  return useCallback(
    (ticker: string) => {
      dispatch(deleteStock(ticker));
      dispatch(deleteStockData(ticker));
    },
    [dispatch],
  );
}
export default useDeleteStock;
