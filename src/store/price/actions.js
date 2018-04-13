/**
 * Generic Constants
 */
const SEND_REQUEST = "PRICE:SEND_REQUEST";
const REQUEST_SUCCESS = "PRICE:REQUEST_SUCCESS";
const REQUEST_FAILURE = "PRICE:REQUEST_FAILURE";

/**
 * Helper Functions
 */
export function generateActionCreator(type, payload = {}) {
  return { type, payload: { ...payload } };
}

/**
 * Action Types
 */
export const PriceActionTypes = {
  SEND_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
};

/**
 * Action Creators
 */
export const PriceActions = {
  request: () => generateActionCreator(PriceActionTypes.SEND_REQUEST),
  success: (cryptocurrency, duration, priceHistory, spotPrices) =>
    generateActionCreator(PriceActionTypes.REQUEST_SUCCESS, {
      key: `${cryptocurrency}-${duration}`,
      priceData: priceHistory,
      spotPrices,
    }),
  failure: error =>
    generateActionCreator(PriceActionTypes.REQUEST_FAILURE, {
      error,
    }),
};
