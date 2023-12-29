import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { deleteCryptoData } from '~/features/investments-data/investments-data-slice';
import { deleteCrypto } from '~/features/investments/investments-slice';
import { useAuth } from '~/lib/firebase';
import useTooltip from './use-tooltip';

function useDeleteCrypto() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const tooltip = useTooltip();
  return useCallback(
    (ticker: string) => {
      if (!auth.currentUser?.uid) return;
      firebaseClient()
        .firestore.investments.cryptoCurrencies.delete(
          auth.currentUser?.uid,
          ticker,
        )
        .then(() => {
          dispatch(deleteCrypto(ticker));
          dispatch(deleteCryptoData(ticker));
          tooltip('Criptomoeda removida com sucesso!');
        });
    },
    [dispatch],
  );
}
export default useDeleteCrypto;
