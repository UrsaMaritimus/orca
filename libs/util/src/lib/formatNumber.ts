export const fCurrency = (value: number | string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value));
};

export const fPercent = (number: number | string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(number) / 100);
};

export const fNumber = (
  number: number | string,
  mantissa = 4,
  thousandSeparated = false
) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: mantissa,
    useGrouping: thousandSeparated,
  }).format(Number(number));
};

export const fShortenNumber = (number: number | string, mantissa = 2) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: mantissa,
    useGrouping: true,
    // @ts-expect-error not added to proper libraries yet
    notation: 'compact',
  }).format(Number(number));
};
