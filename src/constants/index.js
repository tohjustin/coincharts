import PropTypes from "prop-types";

// Breakpoints for responsive layout
const MOBILE_WIDTH = 1024;

// Supported cryptocurrencies
const CRYPTOCURRENCY = {
  BTC: {
    key: "btc",
    name: "Bitcoin",
    fillColor: "#FFEBC5",
    strokeColor: "#FFB01E"
  },
  BCH: {
    key: "bch",
    name: "Bitcoin Cash",
    fillColor: "#E2F0D2",
    strokeColor: "#8DC451"
  },
  ETH: {
    key: "eth",
    name: "Ethereum",
    fillColor: "#F0F1F8",
    strokeColor: "#6E7CB9"
  },
  LTC: {
    key: "ltc",
    name: "Litecoin",
    fillColor: "#ECECEC",
    strokeColor: "#B5B5B5"
  }
};
const CRYPTOCURRENCY_LIST = Object.keys(CRYPTOCURRENCY).map(e => CRYPTOCURRENCY[e]);
const CRYPTOCURRENCY_KEYS = Object.keys(CRYPTOCURRENCY).map(e => CRYPTOCURRENCY[e].key);

// Supported Currencies
const CURRENCY = {
  cad: { key: "CAD", name: "Canadian Dollar" },
  usd: { key: "USD", name: "US Dollar" }
};
const CURRENCY_LIST = Object.keys(CURRENCY).map(e => CURRENCY[e]);
const CURRENCY_KEYS = Object.keys(CURRENCY).map(e => CURRENCY[e].key);

// Time duration constants
const DURATION = {
  HOUR: { key: "hour", codename: "1H", humanize: "past hour" },
  DAY: { key: "day", codename: "1D", humanize: "since yesterday" },
  WEEK: { key: "week", codename: "1W", humanize: "since last week" },
  MONTH: { key: "month", codename: "1M", humanize: "since last month" },
  YEAR: { key: "year", codename: "1Y", humanize: "since last year" },
  ALL: { key: "all", codename: "ALL", humanize: "" }
};
const DURATION_LIST = Object.keys(DURATION).map(e => DURATION[e]);
const DURATION_KEYS = Object.keys(DURATION).map(e => DURATION[e].key);

// Directory where price data (.json files) are stored
const LOCAL_JSON_DATA_DIR = "./priceData";

// Polls the API endpoint every minute to update prices
const POLL_FREQUENCY = 60 * 1000;

// Proptypes
const PROPTYPES = {
  COLOR: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string
  }),
  CURRENCY: PropTypes.oneOf(CURRENCY_KEYS),
  CRYPTOCURRENCY: PropTypes.oneOf(CRYPTOCURRENCY_KEYS),
  DURATION: PropTypes.oneOf(DURATION_KEYS),
  PRICE_DATA: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(Date).isRequired
    }).isRequired
  ),
  SPOT_PRICES: PropTypes.shape({
    btc: PropTypes.number.isRequired,
    bch: PropTypes.number.isRequired,
    eth: PropTypes.number.isRequired,
    ltc: PropTypes.number.isRequired
  }),
  TEXT_ALIGNMENT: PropTypes.oneOf(["left", "right"]),
  HOVER_CONTAINER_POSITION: PropTypes.oneOf(["top", "bottom"]),
  BIG_AMOUNT_TYPE: PropTypes.oneOf(["currency", "percentage"])
};

// Default Props
const DEFAULT_PROPS = {
  COLOR: {
    fill: "#FFEBC5",
    stroke: "#FFB119"
  },
  CURRENCY: "USD",
  CRYPTOCURRENCY: "btc",
  DURATION: "day",
  PRICE_DATA: [],
  STATUS: {
    pricePending: false,
    error: null
  },
  SPOT_PRICES: {
    btc: 0,
    bch: 0,
    eth: 0,
    ltc: 0
  },
  TEXT_ALIGNMENT: "left"
};

export {
  MOBILE_WIDTH,
  CURRENCY,
  CURRENCY_LIST,
  CRYPTOCURRENCY,
  CRYPTOCURRENCY_LIST,
  DEFAULT_PROPS,
  DURATION,
  DURATION_LIST,
  LOCAL_JSON_DATA_DIR,
  POLL_FREQUENCY,
  PROPTYPES,
};
