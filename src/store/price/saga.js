import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { fetchPriceHistory, fetchSpotPrices } from "../../api";
import { SettingsActionTypes, SettingsSelectors } from "../settings";
import { PriceActions, PriceActionTypes } from "./actions";

export function* fetchPrice() {
  try {
    const [currency, cryptocurrency, duration] = yield all([
      select(SettingsSelectors.getSelectedCurrency),
      select(SettingsSelectors.getSelectedCryptocurrency),
      select(SettingsSelectors.getSelectedDuration),
    ]);

    // Fetch data from API based on current selected settings
    const [priceHistory, spotPrices] = yield all([
      call(fetchPriceHistory, cryptocurrency, currency, duration),
      call(fetchSpotPrices, currency),
    ]);

    yield put(PriceActions.success(cryptocurrency, duration, priceHistory, spotPrices));
  } catch (err) {
    yield put(PriceActions.failure(err.message));
  }
}

export default function* priceSaga() {
  yield all([
    takeLatest(PriceActionTypes.SEND_REQUEST, fetchPrice),
    takeLatest(SettingsActionTypes.SELECT_CRYPTOCURRENCY, fetchPrice),
    takeLatest(SettingsActionTypes.SELECT_CURRENCY, fetchPrice),
    takeLatest(SettingsActionTypes.SELECT_DURATION, fetchPrice),
  ]);
}
