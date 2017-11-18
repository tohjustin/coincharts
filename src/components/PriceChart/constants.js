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

// VerticalAxis
const ACTIVE_CURRENCY = "usd";

const DURATION = {
  DAY: "day",
  HOUR: "hour",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
  ALL: "all"
};

// `Object.values` polyfill for IE (since it's not supported by CRA)
const DURATION_LIST = Object.keys(DURATION).map(e => DURATION[e]);

export {
  ACTIVE_CURRENCY,
  CHART_PADDING_TOP,
  CURSOR_RADIUS_SIZE,
  DEFAULT_TICK_COUNT,
  DURATION,
  DURATION_LIST,
  HOVER_CONTAINER_WIDTH,
  TRANSITION,
  VERTICAL_OFFSET
};
