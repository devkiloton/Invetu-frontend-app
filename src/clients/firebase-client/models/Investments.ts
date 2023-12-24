/* eslint-disable no-unused-vars */
export type Stock = {
  ticker: string;
  price: number;
  amount: number;
  startDate: string;
  currency: 'BRL';
  type: 'real-state' | 'etf' | 'stock' | null;
};

export type Crypto = {
  ticker: string;
  price: number;
  amount: number;
  startDate: string;
  currency: 'BRL';
};

export type Treasuries = {
  investedAmount: number;
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
  investedAmount: number;
  rateIndex: number;
  rate?: number;
  index: FixedIncomeIndex;
  currency: 'BRL';
  startDate: string;
  endDate?: string;
};

export type Cash = {
  investedAmount: number;
  currency: 'BRL';
  startDate: string;
};

export type Investments = {
  stocks: Stock[];
  cryptos: Crypto[];
  treasuries: Treasuries[];
  companyLoans: FixedIncome[];
  cash: Cash[];
  investedAmount: number;
};
