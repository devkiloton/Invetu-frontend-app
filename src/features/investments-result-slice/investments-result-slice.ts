/* eslint-disable no-case-declarations */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Type = 'stocks' | 'cryptos' | 'fixed-incomes' | 'treasuries';

type InvestmentResult = {
  id: string;
  // Percentage
  result: number;
  // Period of the result
  period: 'all' | 'ytd' | 'month' | number;
  currency: 'BRL' | 'USD';
  // Side effects for stocks (dividends, bonus, etc.).
  // #TODO: Type not defined yet
  sideEffects: any;
};

type InvestmentResults = {
  fixedIncomes: Array<InvestmentResult>;
  stocks: Array<InvestmentResult>;
  cryptos: Array<InvestmentResult>;
  treasuries: Array<InvestmentResult>;
};

const initialState: InvestmentResults = {
  stocks: [],
  cryptos: [],
  treasuries: [],
  fixedIncomes: [],
};

export const investmentsResultSlice = createSlice({
  name: 'investments-result',
  initialState,
  reducers: {
    addInvestment: (
      state,
      action: PayloadAction<InvestmentResult & { type: Type }>,
    ) => {
      const { payload } = action;
      switch (payload.type) {
        case 'stocks':
          const removeIdFromStocks = state.stocks.filter(
            stock => stock.id !== payload.id,
          );
          state.stocks = [...removeIdFromStocks, payload];
          break;
        case 'cryptos':
          const removeIdFromCryptos = state.stocks.filter(
            crypto => crypto.id !== payload.id,
          );
          state.cryptos = [...removeIdFromCryptos, payload];
          break;
        case 'fixed-incomes':
          const removeIdFromFixedIcomes = state.fixedIncomes.filter(
            fixedIncome => fixedIncome.id !== payload.id,
          );
          state.fixedIncomes = [...removeIdFromFixedIcomes, payload];
          break;
        case 'treasuries':
          const removeIdFromTreasuries = state.treasuries.filter(
            treasury => treasury.id !== payload.id,
          );
          state.treasuries = [...removeIdFromTreasuries, payload];
          break;
      }
    },
    delteInvestment: (
      state,
      action: PayloadAction<InvestmentResult & { type: Type }>,
    ) => {
      const { payload } = action;
      switch (payload.type) {
        case 'stocks':
          const removeIdFromStocks = state.stocks.filter(
            stock => stock.id !== payload.id,
          );
          state.stocks = [...removeIdFromStocks];
          break;
        case 'cryptos':
          const removeIdFromCryptos = state.stocks.filter(
            crypto => crypto.id !== payload.id,
          );
          state.cryptos = [...removeIdFromCryptos];
          break;
        case 'fixed-incomes':
          const removeIdFromFixedIcomes = state.fixedIncomes.filter(
            fixedIncome => fixedIncome.id !== payload.id,
          );
          state.fixedIncomes = [...removeIdFromFixedIcomes];
          break;
        case 'treasuries':
          const removeIdFromTreasuries = state.treasuries.filter(
            treasury => treasury.id !== payload.id,
          );
          state.treasuries = [...removeIdFromTreasuries];
          break;
      }
    },
  },
});

export const { addInvestment } = investmentsResultSlice.actions;
export const investmentsResultReducer = investmentsResultSlice.reducer;
