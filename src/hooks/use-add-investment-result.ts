import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  InvestmentResult,
  InvestmentType,
  addInvestmentResult,
} from '~/features/investments-result-slice/investments-result-slice';
import { updateStock } from '~/features/investments/investments-slice';
import { useCustomSelector } from './use-custom-selector';
import { isStock } from '~/type-guards/is-stock';

function useAddInvestmentResult() {
  const dispatch = useDispatch();
  const investments = useCustomSelector(state => state.investments);
  return useCallback(
    (investmentResult: InvestmentResult, investmentType: InvestmentType) => {
      dispatch(
        addInvestmentResult({ ...investmentResult, type: investmentType }),
      );
      const investment = investments[investmentType]
        .filter(isStock)
        .find(obj => obj.ticker === investmentResult.id);
      if (!investment) return;
      dispatch(
        updateStock({
          ticker: investment.ticker,
          price:
            (investment.price * 1) /
            (investmentResult.sideEffect?.stocksFactor ?? 1),
          amount:
            investment.amount *
            (investmentResult.sideEffect?.stocksFactor ?? 1),
        }),
      );
    },
    [],
  );
}
export default useAddInvestmentResult;
