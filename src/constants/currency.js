export const CURRENCY_DEFAULT = "USD";
export const CURRENCY = {
  CAD: { key: "CAD", name: "Canadian Dollar" },
  USD: { key: "USD", name: "US Dollar" },
};
export const CURRENCY_LIST = Object.keys(CURRENCY).map(e => CURRENCY[e]);
export const CURRENCY_KEYS = Object.keys(CURRENCY).map(e => CURRENCY[e].key);

export default {
  CURRENCY,
  CURRENCY_DEFAULT,
  CURRENCY_LIST,
  CURRENCY_KEYS,
};
