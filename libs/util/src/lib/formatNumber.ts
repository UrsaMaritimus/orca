import replace from 'lodash/replace';
import numbro from 'numbro';

// ----------------------------------------------------------------------

export const fCurrency = (value: number | string) => {
  return numbro(value).format(Number.isInteger(value) ? '$0,0' : '$0,0.00');
};

export const fPercent = (number: number) => {
  return numbro(number / 100).format('0.00%');
};

export const fNumber = (number: number | string, mantissa = 4) => {
  return numbro(number).format({ mantissa });
};

export const fShortenNumber = (number: number | string) => {
  return numbro(number).format({
    average: true,
    mantissa: 2,
    thousandSeparated: true,
  });
};

export const fData = (number: number | string) => {
  return numbro(number).format('0.0 b');
};
