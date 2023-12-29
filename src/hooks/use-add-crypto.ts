import { useDispatch } from 'react-redux';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Crypto } from '~/clients/firebase-client/models/Investments';
import { addCryptoData } from '~/features/investments-data/investments-data-slice';
import { addCrypto } from '~/features/investments/investments-slice';
import { useAuth } from '~/lib/firebase';
import useTooltip from './use-tooltip';

function useAddCrypto() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const tooltip = useTooltip();

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
          .functions.findCryptosData([investment.ticker.toLowerCase()], 'all')
          .then(res => {
            dispatch(addCrypto(investment));
            dispatch(addCryptoData(res[0]));
          });
      });
  };
}
export default useAddCrypto;
