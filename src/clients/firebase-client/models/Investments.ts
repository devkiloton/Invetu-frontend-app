/* eslint-disable no-unused-vars */
export type Stock = {
  ticker: string;
  price: number;
  amount: number;
  startDate: string;
  currency: 'BRL' | 'USD';
  type: 'real-state' | 'etf' | 'stock' | null;
};

export type Crypto = {
  ticker: string;
  name: string;
  price: number;
  amount: number;
  startDate: string;
  currency: 'BRL';
};

export type Treasuries = {
  amount: number;
  rate: number;
  operation: 'pre' | 'post' | 'inflation';
  currency: 'BRL';
  startDate: string;
  endDate: number;
};

export enum FixedIncomeIndex {
  CDI = 'cdi',
  IPCA = 'ipca',
  PRE = 'pre',
}

export type FixedIncome = {
  name: string;
  amount: number;
  rate: number;
  index: FixedIncomeIndex;
  currency: 'BRL';
  startDate: string;
  endDate: string | null;
};

export type Cash = {
  amount: number;
  currency: 'BRL';
  startDate: string;
};

export type Investments = {
  stocks: Stock[];
  cryptos: Crypto[];
  treasuries: Treasuries[];
  fixedIncomes: FixedIncome[];
  cash: Cash[];
  investedAmount: number;
};
