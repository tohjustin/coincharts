import { easeCubicOut } from 'd3-ease';

const DEFAULT_COLOR = {
  fill: '#FFEBC5',
  stroke: '#FFB119',
};

const DEFAULT_TRANSITION = {
  duration: 500,
  ease: easeCubicOut,
};

const IDENTITY_FUNCTION = arg => arg;

export {
  DEFAULT_COLOR,
  DEFAULT_TRANSITION,
  IDENTITY_FUNCTION,
};
