export const DURATION_DEFAULT = "day";
export const DURATION = {
  HOUR: { key: "hour", codename: "1H", humanize: "past hour" },
  DAY: { key: "day", codename: "1D", humanize: "since yesterday" },
  WEEK: { key: "week", codename: "1W", humanize: "since last week" },
  MONTH: { key: "month", codename: "1M", humanize: "since last month" },
  YEAR: { key: "year", codename: "1Y", humanize: "since last year" },
  ALL: { key: "all", codename: "ALL", humanize: "" },
};
export const DURATION_LIST = Object.keys(DURATION).map(e => DURATION[e]);
export const DURATION_KEYS = Object.keys(DURATION).map(e => DURATION[e].key);

export default {
  DURATION,
  DURATION_DEFAULT,
  DURATION_LIST,
  DURATION_KEYS,
};
