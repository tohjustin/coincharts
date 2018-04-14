import { PriceActions } from "../actions";
import PriceReducer from "../reducer";

const INITIAL_PRICE_STATE = {
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

describe("[Price] Reducer", () => {
  it('handles "SEND_REQUEST" correctly', () => {
    const action = PriceActions.request();
    const nextState = PriceReducer(INITIAL_PRICE_STATE, action);

    expect(nextState.status).toEqual({
      loading: true,
      error: null,
    });
    expect(nextState.price).toEqual(INITIAL_PRICE_STATE.price);
    expect(nextState.spot).toEqual(INITIAL_PRICE_STATE.spot);
  });

  it('handles "REQUEST_SUCCESS" correctly', () => {
    const spotPrices = [
      { base: "BTC", currency: "USD", amount: "200" },
      { base: "BCH", currency: "USD", amount: "100" },
    ];
    const action = PriceActions.success("LTC", "year", [], spotPrices);
    const nextState = PriceReducer(INITIAL_PRICE_STATE, action);

    expect(nextState.status).toEqual(INITIAL_PRICE_STATE.status);
    expect(nextState.history).toEqual({
      ...INITIAL_PRICE_STATE.history,
      "LTC-year": [],
    });
    expect(nextState.spot).toEqual({ BCH: 100, BTC: 200 });
  });

  it('handles "REQUEST_FAILURE" correctly', () => {
    const action = PriceActions.failure("Network Error");
    const nextState = PriceReducer(INITIAL_PRICE_STATE, action);

    expect(nextState.status).toEqual({
      loading: false,
      error: "Network Error",
    });
    expect(nextState.price).toEqual(INITIAL_PRICE_STATE.price);
    expect(nextState.spot).toEqual(INITIAL_PRICE_STATE.spot);
  });
});
