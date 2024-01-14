import { tickerLogosClient } from '~/clients/ticker-logos-client';

export const useUsLogos = () => {
  return tickerLogosClient().getUrl;
};
