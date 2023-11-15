export const b3Client = () => {
  const API = 'https://arquivos.b3.com.br/apinegocios';
  const client = {
    autocomplete: async (ticker: string): Promise<Array<string>> => {
      return fetch(`${API}/tickersymbol?q=${ticker}`).then(res => res.json());
    },
    tickerInfo: async (data: { ticker: string; date: number }) => {
      const dateToIso = new Date(data.date).toISOString().split('T')[0];
      return fetch(`${API}/ticker/${data.ticker}/${dateToIso}`).then(res =>
        res.json(),
      );
    },
  };
  return client;
};
