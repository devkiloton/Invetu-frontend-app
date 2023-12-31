import { Crypto } from '~/clients/firebase-client/models/Investments';

export const isCrypto = (item: any): item is Crypto => {
  return item?.name;
};
