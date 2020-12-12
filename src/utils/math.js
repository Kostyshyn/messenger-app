export const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

export const range = (start, end) => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
};
