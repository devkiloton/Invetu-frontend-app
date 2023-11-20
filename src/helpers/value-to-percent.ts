export function valueToPercent(value: Array<number>): Array<number> {
  // find the max value in the array
  const max = Math.max(...value);
  return value.map(v => (max !== 0 ? (v / max) * 100 : 0));
}
