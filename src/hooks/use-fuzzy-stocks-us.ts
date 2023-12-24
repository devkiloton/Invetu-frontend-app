import { useCallback } from 'react';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { FuzzyUS } from '~/clients/firebase-client/models/fuzzy-us';

export default function useFuzzyStocksUS() {
  return useCallback(
    (ticker: string, callback: (symbols: string[]) => void) => {
      firebaseClient()
        .functions.fuzzyStocksUS(ticker)
        .then((res: FuzzyUS) => {
          // add only the symbols
          const symbols = res.map(stock => stock['1. symbol']);
          callback(symbols);
        });
    },
    [],
  );
}
