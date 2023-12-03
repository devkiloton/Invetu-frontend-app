import { Interval } from '~/types/interval';
import { Range } from '~/types/range';

export type FindHistoryParams = {
  ticker: Array<string>;
  range: Range;
  interval: Interval;
};
