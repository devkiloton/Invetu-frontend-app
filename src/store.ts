import { configureStore } from '@reduxjs/toolkit';
import { investmentsReducer } from './features/investments/investments-slice';
import { investmentsDataReducer } from './features/investments-data/investments-data-slice';
import { investmentsResultReducer } from './features/investments-result-slice/investments-result-slice';

export const store = configureStore({
  reducer: {
    investments: investmentsReducer,
    investmentsData: investmentsDataReducer,
    investmentsResult: investmentsResultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
