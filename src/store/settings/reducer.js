import { combineReducers } from "redux";

import { DEFAULT_PROPS } from "../../constants";
import { SettingsActionTypes } from "./actions";

/**
 * State Shape
 *
 * ```
 * {
 *    settings: {
 *      selectedCryptocurrency: "BTC",
 *      selectedCurrency: "USD",
 *      selectedDuration: "day",
 *    }
 * }
 * ```
 */

const initialState = {
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedCurrency: DEFAULT_PROPS.CURRENCY,
  selectedDuration: DEFAULT_PROPS.DURATION,
};

function settingsSelectedCryptocurrency(state = initialState.selectedCryptocurrency, action) {
  switch (action.type) {
    case SettingsActionTypes.SELECT_CRYPTOCURRENCY:
      return action.payload.cryptocurrency;
    default:
      return state;
  }
}

function settingsSelectedCurrency(state = initialState.selectedCurrency, action) {
  switch (action.type) {
    case SettingsActionTypes.SELECT_CURRENCY:
      return action.payload.currency;
    default:
      return state;
  }
}

function settingsSelectedDuration(state = initialState.selectedDuration, action) {
  switch (action.type) {
    case SettingsActionTypes.SELECT_DURATION:
      return action.payload.duration;
    default:
      return state;
  }
}

const settingsReducer = combineReducers({
  selectedCryptocurrency: settingsSelectedCryptocurrency,
  selectedCurrency: settingsSelectedCurrency,
  selectedDuration: settingsSelectedDuration,
});

export default settingsReducer;
