import { getSelectedCryptocurrency, getSelectedCurrency, getSelectedDuration } from "../selectors";

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

describe("[Settings] Selectors", () => {
  describe("getSelectedCryptocurrency()", () => {
    it("should return selected cryptocurrency", () => {
      expect(getSelectedCryptocurrency(TEST_STATE)).toEqual(TEST_STATE_SETTINGS.selectedCryptocurrency);
    });
  });

  describe("getSelectedCurrency()", () => {
    it("should return selected currency", () => {
      expect(getSelectedCurrency(TEST_STATE)).toEqual(TEST_STATE_SETTINGS.selectedCurrency);
    });
  });

  describe("getSelectedDuration()", () => {
    it("should return selected duration", () => {
      expect(getSelectedDuration(TEST_STATE)).toEqual(TEST_STATE_SETTINGS.selectedDuration);
    });
  });
});
