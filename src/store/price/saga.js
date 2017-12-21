import { fetchPriceHistory, fetchSpotPrices } from "../../api";
import { SettingsActionTypes, SettingsSelectors } from "../settings";
import { PriceActionTypes } from "./actions";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

function* fetchPrice() {
  try {
    // Fetch data based on current selected settings
    const currency = yield select(SettingsSelectors.getSelectedCurrency);
    const cryptocurrency = yield select(
      SettingsSelectors.getSelectedCryptocurrency
    );
    const duration = yield select(SettingsSelectors.getSelectedDuration);

    const [priceHistory, spotPrices] = yield all([
      call(fetchPriceHistory, cryptocurrency, currency, duration),
      call(fetchSpotPrices, currency)
    ]);

    yield put({
      type: PriceActionTypes.REQUEST_SUCCESS,
      payload: {
        key: `${cryptocurrency}-${duration}`,
        priceData: priceHistory,
        spotPrices
      }
    });
  } catch (err) {
    yield put({
      type: PriceActionTypes.REQUEST_FAILURE,
      payload: { error: err.message }
    });
  }
}

export default function* priceSaga() {
  yield all([
    takeLatest(PriceActionTypes.SEND_REQUEST, fetchPrice),
    takeLatest(SettingsActionTypes.SELECT_CRYPTOCURRENCY, fetchPrice),
    takeLatest(SettingsActionTypes.SELECT_CURRENCY, fetchPrice),
    takeLatest(SettingsActionTypes.SELECT_DURATION, fetchPrice)
  ]);
}
