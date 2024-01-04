import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Crypto } from '~/clients/firebase-client/models/Investments';
import { addCryptoData } from '~/features/investments-data/investments-data-slice';
import { addCrypto } from '~/features/investments/investments-slice';
import { useAuth } from '~/lib/firebase';
import useSnackbar from './use-snackbar';

function useAddCrypto() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const tooltip = useSnackbar();

  return (investment: Crypto) => {
    firebaseClient()
      .firestore.investments.cryptoCurrencies.add({
        ...investment,
        ticker: investment.ticker.toLowerCase(),
        userID: auth.currentUser?.uid!,
      })
      .then(() => {
        tooltip('Criptomoeda adicionada com sucesso!');
        firebaseClient()
          // #TODO: Improve the algorithm to get the best period from coinstats and don't spend much time
          .functions.findCryptosData([investment.ticker.toLowerCase()], 'all')
          .then(res => {
            dispatch(addCrypto(investment));
            dispatch(addCryptoData(res[0]));
          });
      });
  };
}
export default useAddCrypto;
