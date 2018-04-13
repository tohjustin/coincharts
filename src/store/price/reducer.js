import { combineReducers } from "redux";

import { DEFAULT_PROPS } from "../../constants";
import { PriceActionTypes } from "./actions";

/**
 * State Shape
 *
 * ```
 * {
 *    price: {
 *      status: {
 *        loading: false,
 *        error: null
 *      },
 *      history: {
 *        'BTC-day': [
 *          { price: XXX, time: "ISO-STRING" },
 *          { price: XXX, time: "ISO-STRING" },
 *          ...
 *        ],
 *        'LTC-week': [
 *          { price: YYY, time: "ISO-STRING" },
 *          { price: YYY, time: "ISO-STRING" },
 *          ...
 *        ]
 *      },
 *      spot: {
 *        'BTC': WWW,
 *        'BCH': XXX,
 *        'ETH': YYY,
 *        'LTC': ZZZ,
 *      }
 *    }
 * }
 * ```
 */

const initialState = {
  status: DEFAULT_PROPS.PRICE_STATUS,
  history: {},
  spot: DEFAULT_PROPS.SPOT_PRICES,
};

function priceStatus(state = initialState.status, action) {
  switch (action.type) {
    case PriceActionTypes.SEND_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case PriceActionTypes.REQUEST_SUCCESS:
      return initialState.status;
    case PriceActionTypes.REQUEST_FAILURE:
      return {
        loading: false,
        error: action.payload.error,
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
        [action.payload.key]: action.payload.priceData,
      };
    default:
      return state;
  }
}

function priceSpot(state = initialState.spot, action) {
  switch (action.type) {
    case PriceActionTypes.REQUEST_SUCCESS:
      return action.payload.spotPrices.reduce((spotPrices, e) => {
        const key = e.base;
        const value = Number(e.amount);

        // eslint-disable-next-line no-param-reassign
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
  spot: priceSpot,
});

export default priceReducer;
