import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Crypto } from '~/clients/firebase-client/models/Investments';
import { useAuth } from '~/lib/firebase';

function useAddCrypto() {
  const dispatch = useDispatch();
  const auth = useAuth();
  return useCallback(
    (investment: Crypto) => {
      firebaseClient().firestore.investments.cryptoCurrencies.add({
        ...investment,
        userID: auth.currentUser?.uid!,
      });
    },
    [dispatch],
  );
}
export default useAddCrypto;
