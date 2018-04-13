import { color } from "../styles/constants";

export const CRYPTOCURRENCY_DEFAULT = "BTC";
export const CRYPTOCURRENCY = {
  BTC: {
    key: "BTC",
    name: "Bitcoin",
    fillColor: color.bitcoinLight,
    strokeColor: color.bitcoin,
  },
  BCH: {
    key: "BCH",
    name: "Bitcoin Cash",
    fillColor: color.bitcoinCashLight,
    strokeColor: color.bitcoinCash,
  },
  ETH: {
    key: "ETH",
    name: "Ethereum",
    fillColor: color.ethereumLight,
    strokeColor: color.ethereum,
  },
  LTC: {
    key: "LTC",
    name: "Litecoin",
    fillColor: color.litecoinLight,
    strokeColor: color.litecoin,
  },
};
export const CRYPTOCURRENCY_LIST = Object.keys(CRYPTOCURRENCY).map(e => CRYPTOCURRENCY[e]);
export const CRYPTOCURRENCY_KEYS = Object.keys(CRYPTOCURRENCY).map(e => CRYPTOCURRENCY[e].key);

export default {
  CRYPTOCURRENCY,
  CRYPTOCURRENCY_DEFAULT,
  CRYPTOCURRENCY_LIST,
  CRYPTOCURRENCY_KEYS,
};
