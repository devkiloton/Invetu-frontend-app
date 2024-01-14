import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentBalance } from '~/features/investments-result-slice/investments-result-slice';

function useAddCurrentBalance() {
  const dispatch = useDispatch();
  return useCallback((increment: number) => {
    dispatch(addCurrentBalance(increment));
  }, []);
}
export default useAddCurrentBalance;
