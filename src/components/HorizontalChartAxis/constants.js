const DEFAULT_TICK_COUNT = 7;

const DURATION = {
  DAY: 'day',
  HOUR: 'hour',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  ALL: 'all',
};

// `Object.values` polyfill for IE (since it's not supported by CRA)
const DURATION_LIST = Object.keys(DURATION).map(e => DURATION[e]);

export {
  DEFAULT_TICK_COUNT,
  DURATION,
  DURATION_LIST,
};
