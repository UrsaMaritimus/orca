import replace from 'lodash/replace';
import numbro from 'numbro';

// ----------------------------------------------------------------------

export const fCurrency = (value: number | string) => {
  return numbro(value).format(Number.isInteger(value) ? '$0,0' : '$0,0.00');
};

export const fPercent = (number: number) => {
  return numbro(number / 100).format('0.0%');
};

export const fNumber = (number: number | string) => {
  return numbro(number).format();
};

export const fShortenNumber = (number: number | string) => {
  return replace(numbro(number).format('0.00a'), '.00', '');
};

export const fData = (number: number | string) => {
  return numbro(number).format('0.0 b');
};
