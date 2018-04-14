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

export function* sendRequest() {
  yield put(PriceActions.request());
}

export default function* priceSaga() {
  yield all([
    takeLatest(SettingsActionTypes.SELECT_CRYPTOCURRENCY, sendRequest),
    takeLatest(SettingsActionTypes.SELECT_CURRENCY, sendRequest),
    takeLatest(SettingsActionTypes.SELECT_DURATION, sendRequest),
    takeLatest(PriceActionTypes.SEND_REQUEST, fetchPrice),
  ]);
}
