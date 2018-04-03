import { easeCubicOut } from "d3-ease";

// Graph
const GRAPH_PADDING_TOP = 20;
const TRANSITION = { duration: 500, ease: easeCubicOut };

// Cursor
const CURSOR_RADIUS_SIZE = 4;

// HorizontalAxis
const TICK_COUNT_DESKTOP = 7;
const TICK_COUNT_MOBILE = 4;

// HoverContainer
const HOVER_CONTAINER_WIDTH = 200;
const VERTICAL_OFFSET = -12;

export {
  GRAPH_PADDING_TOP,
  CURSOR_RADIUS_SIZE,
  TICK_COUNT_DESKTOP,
  TICK_COUNT_MOBILE,
  HOVER_CONTAINER_WIDTH,
  TRANSITION,
  VERTICAL_OFFSET,
};
