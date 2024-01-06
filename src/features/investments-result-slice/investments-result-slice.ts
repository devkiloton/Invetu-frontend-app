/* eslint-disable no-case-declarations */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InvestmentType = 'stocks' | 'cryptos' | 'fixed-incomes' | 'treasuries';

export type InvestmentResult = {
  id: string;
  // Percentage
  result: number;
  // Percentage in the wallet
  weight: number;
  // Period of the result
  period: 'all' | 'ytd' | 'month' | number;
  currency: 'BRL' | 'USD';
  // Side effects for stocks (dividends, bonus, etc.).
  // #TODO: Type not defined yet
  sideEffect?: any;
};

type InvestmentResults = {
  fixedIncomes: Array<InvestmentResult>;
  stocks: Array<InvestmentResult>;
  cryptos: Array<InvestmentResult>;
  treasuries: Array<InvestmentResult>;
  totalResult: number;
};

const initialState: InvestmentResults = {
  stocks: [],
  cryptos: [],
  treasuries: [],
  fixedIncomes: [],
  totalResult: 1,
};

export const investmentsResultSlice = createSlice({
  name: 'investments-result',
  initialState,
  reducers: {
    addInvestmentResult: (
      state,
      action: PayloadAction<InvestmentResult & { type: InvestmentType }>,
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
    deleteInvestmentResult: (
      state,
      action: PayloadAction<InvestmentResult & { type: InvestmentType }>,
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

export const { addInvestmentResult, deleteInvestmentResult } = investmentsResultSlice.actions;
export const investmentsResultReducer = investmentsResultSlice.reducer;
