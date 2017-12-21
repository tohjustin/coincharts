/**
 * Generic Constants
 */
const SEND_REQUEST = "PRICE:SEND_REQUEST";
const REQUEST_SUCCESS = "PRICE:REQUEST_SUCCESS";
const REQUEST_FAILURE = "PRICE:REQUEST_FAILURE";

/**
 * Helper Functions
 */
function generateActionCreator(type, payload = {}) {
  return { type, payload: { ...payload } };
}

/**
 * Action Types
 */
export const PriceActionTypes = {
  SEND_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE
};

/**
 * Action Creators
 */
export const PriceActions = {
  request: () => generateActionCreator(PriceActionTypes.SEND_REQUEST),
  success: (cryptocurrency, duration, response) =>
    generateActionCreator(PriceActionTypes.REQUEST_SUCCESS, {
      cryptocurrency,
      duration,
      response
    }),
  failure: (cryptocurrency, duration, error) =>
    generateActionCreator(PriceActionTypes.REQUEST_FAILURE, {
      cryptocurrency,
      duration,
      error
    })
};
