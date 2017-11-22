import { fetchPriceHistory, fetchSpotPrices } from "../../../api";
import { PRICE } from "../actions";
import { all, call, put, takeLatest } from "redux-saga/effects";

const DEFAULT_CURRENCY = "USD";

function* fetchPrice(action) {
  try {
    const { cryptocurrency, duration } = action.payload;

    const [priceHistory, spotPrices] = yield all([
      call(fetchPriceHistory, cryptocurrency, DEFAULT_CURRENCY, duration),
      call(fetchSpotPrices, DEFAULT_CURRENCY)
    ]);

    yield put({
      type: PRICE.SUCCESS,
      payload: {
        key: `${cryptocurrency}-${duration}`,
        priceData: priceHistory,
        spotPrices
      }
    });
  } catch (err) {
    yield put({ type: PRICE.FAILURE, payload: { error: err.message } });
  }
}

export default function* priceSaga() {
  yield takeLatest(PRICE.REQUEST, fetchPrice);
}
