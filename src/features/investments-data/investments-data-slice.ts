import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { AsyncStateRedux } from '../types/async-state';
import {
  HistoryStockBR,
  Result,
} from '~/clients/firebase-client/models/history-stock-br';
import { useAuth } from '~/lib/firebase';
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
    const state = getState();
    if (state.investmentsData.asyncState.isLoaded) return state.investmentsData;
    const auth = useAuth();
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('User not found');
    const investments = await firebaseClient().firestore.investments.get(uid);
    const joinedStocks = investments.stocks.map(stock => stock.ticker);
    return await firebaseClient()
      .functions.findHistoryStocksBR(joinedStocks, 'max', '1d')
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
  },
);

export const investmentsDataSlice = createSlice({
  name: 'investments-data',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<Result>) => {
      state.data = {
        ...state.data,
        [action.payload.symbol]: action.payload,
      };
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

export const { addStock } = investmentsDataSlice.actions;
export const investmentsDataReducer = investmentsDataSlice.reducer;
