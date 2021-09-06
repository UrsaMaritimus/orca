import chroma from 'chroma-js';

export const colorScale = (input: number, x0 = 45, xf = 66.667) => {
  return chroma
    .scale(['#2BB673', '#f00'])
    .domain([x0, xf])
    .mode('lrgb')(input)
    .hex();
};
