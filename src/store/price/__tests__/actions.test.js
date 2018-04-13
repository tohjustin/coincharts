import { PriceActions, PriceActionTypes } from "../actions";

describe("[Price] Actions", () => {
  it('should create a "SEND_REQUEST" action correctly', () => {
    const expectedAction = {
      type: PriceActionTypes.SEND_REQUEST,
      payload: {},
    };

    expect(PriceActions.request()).toEqual(expectedAction);
  });

  it('should create a "REQUEST_SUCCESS" action correctly', () => {
    const key = "BTC-day";
    const priceData = [];
    const spotPrices = [
      { base: "BTC", currency: "USD", amount: "200" },
      { base: "BCH", currency: "USD", amount: "100" },
    ];
    const expectedAction = {
      type: PriceActionTypes.REQUEST_SUCCESS,
      payload: { key, priceData, spotPrices },
    };

    expect(PriceActions.success("BTC", "day", priceData, spotPrices)).toEqual(expectedAction);
  });

  it('should create a "REQUEST_FAILURE" action correctly', () => {
    const error = "Network Error";
    const expectedAction = {
      type: PriceActionTypes.REQUEST_FAILURE,
      payload: { error },
    };

    expect(PriceActions.failure(error)).toEqual(expectedAction);
  });
});
