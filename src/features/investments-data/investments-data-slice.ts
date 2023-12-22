import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { AsyncStateRedux } from '../types/async-state';
import {
  HistoryStockBR,
  Result,
} from '~/clients/firebase-client/models/history-stock-br';
import { useAuth } from '~/lib/firebase';
import getStocksHighestDateRange from '~/helpers/get-stocks-highest-date-range';
type InvestmentsData = {
  data: Record<string, Result>;
  asyncState: AsyncStateRedux;
};

const initialState: InvestmentsData = {
  data: {},
  asyncState: {
    isLoading: false,
    isLoaded: false,
    error: null,
  },
};

export const fetchAllInvestmentsData: any = createAsyncThunk(
  'investments-data/fetchAllInvestmentsData',
  async (_arg, { getState }) => {
    const state = getState() as any;
    if (state.investmentsData.asyncState.isLoaded) return state.investmentsData;
    const auth = useAuth();
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('User not found');
    const investments = await firebaseClient().firestore.investments.get(uid);
    const joinedStocks = investments.stocks.map(stock => stock.ticker);

    const stocksData = getStocksHighestDateRange(investments.stocks);

    if (stocksData.stocksMaxRangeTickers.length === 0) {
      return await firebaseClient()
        .functions.findHistoryStocksBR(
          joinedStocks,
          stocksData.highestRange,
          '1d',
        )
        .then(res => {
          res[0] as HistoryStockBR;
          const data = res[0].results.reduce(
            (acc, result) => {
              acc[result.symbol] = result;
              return acc;
            },
            {} as Record<string, Result>,
          );
          return { data };
        });
    } else {
      // Create two promises, one for the stocks with max range and another for the stocks with the highest range, then join them in a way that has the same signature as the first if block
      const maxRangePromise =
        stocksData.stocksMaxRangeTickers.length === 0
          ? firebaseClient().functions.findHistoryStocksBR(
              stocksData.stocksMaxRangeTickers,
              'max',
              '5d',
            )
          : new Promise<[]>(() => []);
      const highestRangePromise =
        firebaseClient().functions.findHistoryStocksBR(
          joinedStocks,
          stocksData.highestRange,
          '1d',
        );
      const [maxRange, highestRange] = await Promise.all([
        maxRangePromise,
        highestRangePromise,
      ]);
      const maxRangeData = maxRange[0].results.reduce(
        (acc, result) => {
          acc[result.symbol] = result;
          return acc;
        },
        {} as Record<string, Result>,
      );
      const highestRangeData = highestRange[0].results.reduce(
        (acc, result) => {
          acc[result.symbol] = result;
          return acc;
        },
        {} as Record<string, Result>,
      );
      return { data: { ...maxRangeData, ...highestRangeData } };
    }
  },
);

export const investmentsDataSlice = createSlice({
  name: 'investments-data',
  initialState,
  reducers: {
    addStockData: (state, action: PayloadAction<Result>) => {
      state.data = {
        ...state.data,
        [action.payload.symbol]: action.payload,
      };
    },
    deleteStockData: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllInvestmentsData.pending, state => {
      state.asyncState.isLoading = true;
    });
    builder.addCase(
      fetchAllInvestmentsData.fulfilled,
      (_state, action: PayloadAction<InvestmentsData>) => {
        return {
          ...action.payload,
          asyncState: { isLoading: false, error: null, isLoaded: true },
        };
      },
    );
    builder.addCase(fetchAllInvestmentsData.rejected, (state, action) => {
      state.asyncState.isLoading = false;
      state.asyncState.error =
        action.error.message ?? new Error('Fetch investments failed').message;
    });
  },
});

export const { addStockData, deleteStockData } = investmentsDataSlice.actions;
export const investmentsDataReducer = investmentsDataSlice.reducer;
