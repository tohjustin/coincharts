import { easeCubicOut } from 'd3-ease';

const CURSOR_RADIUS_SIZE = 4;
const HOVER_CONTAINER_WIDTH = 200;

const DEFAULT_COLOR = {
  fill: '#FFEBC5',
  stroke: '#FFB119',
};

const DEFAULT_FUNCTION = arg => arg;

const DEFAULT_TRANSITION = {
  duration: 500,
  ease: easeCubicOut,
};

export {
  CURSOR_RADIUS_SIZE,
  HOVER_CONTAINER_WIDTH,
  DEFAULT_COLOR,
  DEFAULT_TRANSITION,
  DEFAULT_FUNCTION,
};
