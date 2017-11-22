import { combineReducers } from "redux";
import { PRICE } from "../actions";

/** 
 * State Shape
 * 
 * ```
 * {
 *    price: {
 *      status: {
 *        pricePending,
 *        error
 *      },
 *      history: [],
 *      spot: []
 *    }
 * }
 * ```
 */

const initialState = {
  status: {
    pricePending: false,
    error: null
  },
  history: [],
  spot: []
};

function priceStatus(state = initialState.status, action) {
  switch (action.type) {
    case PRICE.REQUEST:
      return {
        pricePending: true,
        error: null
      };
    case PRICE.SUCCESS:
      return initialState.status;
    case PRICE.FAILURE:
      return {
        pricePending: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

function priceHistory(state = initialState.history, action) {
  switch (action.type) {
    case PRICE.SUCCESS:
      return action.payload.priceData;
    default:
      return state;
  }
}

function priceSpot(state = initialState.spot, action) {
  switch (action.type) {
    case PRICE.SUCCESS:
      return action.payload.spotPrices;
    default:
      return state;
  }
}

const priceReducer = combineReducers({
  status: priceStatus,
  history: priceHistory,
  spot: priceSpot
});

export default priceReducer;
