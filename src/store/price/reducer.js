import { combineReducers } from "redux";

import { PriceActionTypes } from "./actions";

/**
 * State Shape
 *
 * ```
 * {
 *    price: {
 *      status: {
 *        pricePending: false,
 *        error: null
 *      },
 *      history: {
 *        'btc-day': [
 *          { price: XXX, time: "ISO-STRING" },
 *          { price: XXX, time: "ISO-STRING" },
 *          ...
 *        ],
 *        'ltc-week': [
 *          { price: YYY, time: "ISO-STRING" },
 *          { price: YYY, time: "ISO-STRING" },
 *          ...
 *        ]
 *      },
 *      spot: {
 *        'btc': XXX,
 *        'eth': YYY,
 *        'ltc': ZZZ,
 *      }
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
  spot: {
    btc: 0,
    bch: 0,
    eth: 0,
    ltc: 0
  }
};

function priceStatus(state = initialState.status, action) {
  switch (action.type) {
    case PriceActionTypes.SEND_REQUEST:
      return {
        pricePending: true,
        error: null
      };
    case PriceActionTypes.REQUEST_SUCCESS:
      return initialState.status;
    case PriceActionTypes.REQUEST_FAILURE:
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
    case PriceActionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        [action.payload.key]: action.payload.priceData
      };
    default:
      return state;
  }
}

function priceSpot(state = initialState.spot, action) {
  switch (action.type) {
    case PriceActionTypes.REQUEST_SUCCESS:
      return action.payload.spotPrices.reduce((spotPrices, e) => {
        const key = e.base.toLowerCase();
        const value = Number(e.amount);
        spotPrices[key] = value;
        return spotPrices;
      }, {});
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
