import { configureStore } from '@reduxjs/toolkit';
import { investmentsReducer } from './features/investments/investments-slice';
import { investmentsDataReducer } from './features/investments-data/investments-data-slice';

export const store = configureStore({
  reducer: {
    investments: investmentsReducer,
    investmentsData: investmentsDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
