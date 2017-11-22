/**
 * Generic Constants
 */
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

/**
 * Helper Functions
 */
function action(type, payload = {}) {
  return { type, payload: { ...payload } };
}

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

/**
 * Action Types
 */
export const PRICE = createRequestTypes("PRICE");

/**
 * Action Creators
 */
export const price = {
  request: (cryptocurrency, duration) =>
    action(PRICE[REQUEST], { cryptocurrency, duration }),
  success: (cryptocurrency, duration, response) =>
    action(PRICE[SUCCESS], { cryptocurrency, duration, response }),
  failure: (cryptocurrency, duration, error) =>
    action(PRICE[FAILURE], { cryptocurrency, duration, error })
};
