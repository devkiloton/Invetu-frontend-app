import { configureStore } from '@reduxjs/toolkit';
import { investmentsReducer } from './features/investments/investments-slice';

export const store = configureStore({
  reducer: {
    investments: investmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
