export * from './variants';

export { default as MotionInView } from './MotionInView';
export { default as MotionContainer } from './MotionContainer';
export { default as DialogAnimate } from './DialogAnimate';
export { default as ButtonAnimate } from './ButtonAnimate';

export const loadFeatures = () =>
  import('./animationLoad').then((res) => res.default);
