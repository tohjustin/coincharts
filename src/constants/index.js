import { CRYPTOCURRENCY, CRYPTOCURRENCY_KEYS, CRYPTOCURRENCY_LIST } from "./cryptocurrency";
import { CURRENCY, CURRENCY_KEYS, CURRENCY_LIST } from "./currency";
import { DURATION, DURATION_KEYS, DURATION_LIST } from "./duration";
import { DEFAULT_PROPS, PROPTYPES } from "./proptypes";

// Directory where price data (.json files) are stored
const LOCAL_JSON_DATA_DIR = "./priceData";

// Polls the API endpoint every minute to update prices
const POLL_FREQUENCY = 60 * 1000;

export {
  CRYPTOCURRENCY,
  CRYPTOCURRENCY_KEYS,
  CRYPTOCURRENCY_LIST,
  CURRENCY,
  CURRENCY_KEYS,
  CURRENCY_LIST,
  DURATION,
  DURATION_KEYS,
  DURATION_LIST,
  DEFAULT_PROPS,
  LOCAL_JSON_DATA_DIR,
  POLL_FREQUENCY,
  PROPTYPES,
};
