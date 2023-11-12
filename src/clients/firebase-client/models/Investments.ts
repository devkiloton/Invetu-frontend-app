export type Stock = {
  userID: string;
  ticker: string;
  price: number;
  amount: number;
  startDate: number;
  currency: 'BRL';
  type: 'real-state' | 'etf' | 'stock' | null;
};

export type Crypto = {
  userID: string;
  ticker: string;
  price: number;
  amount: number;
  startDate: number;
  currency: 'BRL';
};

export type Treasuries = {
  userID: string;
  investedAmount: number;
  rate: number;
  operation: 'pre' | 'post' | 'inflation';
  currency: 'BRL';
  startDate: number;
  endDate: number;
};

export type CompanyLoans = {
  userID: string;
  investedAmount: number;
  rate: number;
  operation: 'pre' | 'post' | 'inflation';
  currency: 'BRL';
  startDate: number;
  endDate: number;
};

export type Cash = {
  userID: string;
  investedAmount: number;
  currency: 'BRL';
  startDate: number;
};

export type Investments = {
  stocks: Stock[];
  cryptos: Crypto[];
  treasuries: Treasuries[];
  companyLoans: CompanyLoans[];
  cash: Cash[];
  investedAmount: number;
};
