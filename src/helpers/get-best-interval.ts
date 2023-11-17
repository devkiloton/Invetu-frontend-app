import { Interval } from '~/types/interval';
import { Range } from '~/types/range';

/**
 * Get the best interval to use for the given range
 * @param range - The amount of time to get data for
 * @returns The best interval to use for the given range
 */
const getBestInterval = (range: Range): Interval => {
  switch (range) {
    case '1d':
      return '5m';
    case '5d':
      return '1h';
    case '1mo':
      return '1d';
    case '3mo':
      return '1d';
    case '6mo':
      return '1d';
    case '1y':
      return '5d';
    case '2y':
      return '1wk';
    case '5y':
      return '1mo';
    case '10y':
      return '3mo';
    default:
      return '1d';
  }
};

export default getBestInterval;
