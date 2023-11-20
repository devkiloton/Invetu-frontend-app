import { CDI } from './models/cdi';

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
    },
  };
  return client;
};

export default bacenClient;
