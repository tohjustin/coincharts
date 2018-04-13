import { runSaga } from "redux-saga";

import { fetchPriceHistory, fetchSpotPrices } from "../../../api";
import { PriceActions } from "../actions";
import { fetchPrice, sendRequest } from "../saga";

const TEST_STATE_PRICE = {
  status: {
    loading: false,
    error: null,
  },
  history: {
    "BTC-hour": [
      { price: 1000, time: new Date("2018-04-11T00:00:00.000Z") },
      { price: 1010, time: new Date("2018-04-11T00:10:00.000Z") },
      { price: 1020, time: new Date("2018-04-11T00:20:00.000Z") },
      { price: 1030, time: new Date("2018-04-11T00:30:00.000Z") },
      { price: 1040, time: new Date("2018-04-11T00:40:00.000Z") },
      { price: 1050, time: new Date("2018-04-11T00:50:00.000Z") },
      { price: 1060, time: new Date("2018-04-11T01:00:00.000Z") },
      { price: 1070, time: new Date("2018-04-11T01:10:00.000Z") },
    ],
    "BTC-day": [
      { price: 1000, time: new Date("2018-04-04T00:00:00.000Z") },
      { price: 1010, time: new Date("2018-04-05T00:00:00.000Z") },
      { price: 1020, time: new Date("2018-04-06T00:00:00.000Z") },
      { price: 1030, time: new Date("2018-04-07T00:00:00.000Z") },
      { price: 1040, time: new Date("2018-04-08T00:00:00.000Z") },
      { price: 1050, time: new Date("2018-04-09T00:00:00.000Z") },
      { price: 1060, time: new Date("2018-04-10T00:00:00.000Z") },
      { price: 1070, time: new Date("2018-04-11T00:00:00.000Z") },
    ],
  },
  spot: {
    BTC: 2000,
    BCH: 700,
    ETH: 400,
    LTC: 100,
  },
};

const TEST_STATE_SETTINGS = {
  selectedCryptocurrency: "BTC",
  selectedCurrency: "USD",
  selectedDuration: "day",
};

const TEST_STATE = {
  price: TEST_STATE_PRICE,
  settings: TEST_STATE_SETTINGS,
};

describe("[Price] Saga", () => {
  it('*fetchPrice should dispatch a "REQUEST_SUCCESS" action', async () => {
    const cryptocurrency = TEST_STATE_SETTINGS.selectedCryptocurrency;
    const currency = TEST_STATE_SETTINGS.selectedCurrency;
    const duration = TEST_STATE_SETTINGS.selectedDuration;
    const dispatchedActions = [];
    const expectedActions = [
      PriceActions.success(
        cryptocurrency,
        duration,
        await fetchPriceHistory(cryptocurrency, currency, duration),
        await fetchSpotPrices(currency),
      ),
    ];

    await runSaga(
      {
        dispatch: action => dispatchedActions.push(action),
        getState: () => TEST_STATE,
      },
      fetchPrice,
    ).done;

    expect(dispatchedActions).toEqual(expectedActions);
  });

  it('*sendRequest should dispatch a "SEND_REQUEST" action', async () => {
    const dispatchedActions = [];
    const expectedActions = [PriceActions.request()];

    await runSaga(
      {
        dispatch: action => dispatchedActions.push(action),
        getState: () => TEST_STATE,
      },
      sendRequest,
    ).done;

    expect(dispatchedActions).toEqual(expectedActions);
  });
});
