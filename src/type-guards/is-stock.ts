import { Stock } from '~/clients/firebase-client/models/Investments';

export const isStock = (item: any): item is Stock => {
  return 'type' in item;
};
