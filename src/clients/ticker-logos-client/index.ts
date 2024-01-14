const API_URL = import.meta.env['VITE_TICKER_LOGOS_URI'];
export const tickerLogosClient = () => ({
  get: async (ticker: string) => {
    return (await fetch(`${API_URL}/${ticker}.png`).then(res =>
      res.json(),
    )) as string;
  },
  getUrl: (ticker: string) => {
    return `${API_URL}/${ticker}.png?raw=true`;
  },
});
