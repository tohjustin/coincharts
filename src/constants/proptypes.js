import PropTypes from "prop-types";

import { color } from "../styles/constants";
import { CRYPTOCURRENCY_DEFAULT, CRYPTOCURRENCY_KEYS } from "./cryptocurrency";
import { CURRENCY_DEFAULT, CURRENCY_KEYS } from "./currency";
import { DURATION_DEFAULT, DURATION_KEYS } from "./duration";

export const PROPTYPES = {
  COLOR: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
  }),
  CURRENCY: PropTypes.oneOf(CURRENCY_KEYS),
  CRYPTOCURRENCY: PropTypes.oneOf(CRYPTOCURRENCY_KEYS),
  DURATION: PropTypes.oneOf(DURATION_KEYS),
  PRICE_DATA: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
  ),
  PRICE_STATUS: {
    loading: PropTypes.bool,
    error: PropTypes.object,
  },
  SPOT_PRICES: PropTypes.shape({
    BTC: PropTypes.number.isRequired,
    BCH: PropTypes.number.isRequired,
    ETH: PropTypes.number.isRequired,
    LTC: PropTypes.number.isRequired,
  }),
  ALIGNMENT: PropTypes.oneOf(["left", "right"]),
  HOVER_CONTAINER_POSITION: PropTypes.oneOf(["top", "bottom"]),
  BIG_AMOUNT_TYPE: PropTypes.oneOf(["currency", "percentage"]),
};

// Default Props
export const DEFAULT_PROPS = {
  COLOR: {
    fill: color.bitcoinLight,
    stroke: color.bitcoin,
  },
  CURRENCY: CURRENCY_DEFAULT,
  CRYPTOCURRENCY: CRYPTOCURRENCY_DEFAULT,
  DURATION: DURATION_DEFAULT,
  PRICE_DATA: [],
  PRICE_STATUS: {
    loading: false,
    error: null,
  },
  SPOT_PRICES: {
    BTC: 0,
    BCH: 0,
    ETH: 0,
    LTC: 0,
  },
  ALIGNMENT: "left",
};

export default {
  PROPTYPES,
  DEFAULT_PROPS,
};
