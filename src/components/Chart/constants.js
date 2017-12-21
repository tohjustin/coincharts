import { easeCubicOut } from "d3-ease";

// Chart
const CHART_PADDING_TOP = 20;
const TRANSITION = { duration: 500, ease: easeCubicOut };

// Cursor
const CURSOR_RADIUS_SIZE = 4;

// HorizontalAxis
const DEFAULT_TICK_COUNT = 7;

// HoverContainer
const HOVER_CONTAINER_WIDTH = 200;
const VERTICAL_OFFSET = -12;

export {
  CHART_PADDING_TOP,
  CURSOR_RADIUS_SIZE,
  DEFAULT_TICK_COUNT,
  HOVER_CONTAINER_WIDTH,
  TRANSITION,
  VERTICAL_OFFSET
};
