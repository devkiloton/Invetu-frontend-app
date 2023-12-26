import { CDI } from './models/cdi';
import { HistoryCDI } from './models/history-cdi';
import { HistoryIPCA } from './models/history-ipca';

export const bacenClient = () => {
  const API_URL = import.meta.env.VITE_API_BACEN;

  const client = {
    cdi: {
      findAccumulatedCurrentMonth: async (): Promise<Array<CDI>> => {
        const cdi = await fetch(
          `${API_URL}/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json`,
        ).then(res => res.json());
        return cdi;
      },
      findHistory: async (): Promise<HistoryCDI> => {
        const cdiHistory = (await fetch(
          `${API_URL}/dados/serie/bcdata.sgs.4391/dados?formato=json`,
        ).then(res => res.json())) as HistoryCDI;
        return cdiHistory;
      },
    },
    ipca: {
      findHistory: async (): Promise<HistoryIPCA> => {
        const ipcaHistory = (await fetch(
          `${API_URL}/dados/serie/bcdata.sgs.433/dados?formato=json`,
        ).then(res => res.json())) as HistoryIPCA;
        return ipcaHistory;
      },
    },
  };
  return client;
};

export default bacenClient;
