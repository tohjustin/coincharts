import {
  getPrice,
  getPriceStatus,
  getPriceHistories,
  getSelectedPriceHistory,
  getSpotPrices,
  getSelectedSpotPrice,
  getSelectedPriceDifference,
  getSelectedPercentDifference,
} from "../selectors";

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

describe("[Price] Selectors", () => {
  describe("getPrice()", () => {
    it("should return all price data", () => {
      expect(getPrice(TEST_STATE)).toEqual(TEST_STATE_PRICE);
    });
  });

  describe("getPriceStatus()", () => {
    it("should return price status", () => {
      expect(getPriceStatus(TEST_STATE)).toEqual(TEST_STATE_PRICE.status);
    });
  });

  describe("getPriceHistories()", () => {
    it("should return all price history", () => {
      expect(getPriceHistories(TEST_STATE)).toEqual(TEST_STATE_PRICE.history);
    });
  });

  describe("getSelectedPriceHistory()", () => {
    it("should return price history of selected cryptocurrency & duration", () => {
      expect(getSelectedPriceHistory(TEST_STATE)).toEqual(TEST_STATE_PRICE.history["BTC-day"]);
    });
  });

  describe("getSpotPrices()", () => {
    it("should return spot prices", () => {
      expect(getSpotPrices(TEST_STATE)).toEqual(TEST_STATE_PRICE.spot);
    });
  });

  describe("getSelectedSpotPrice()", () => {
    it("should return spot price of selected cryptocurrency", () => {
      expect(getSelectedSpotPrice(TEST_STATE)).toEqual(TEST_STATE_PRICE.spot.BTC);
    });
  });

  describe("getSelectedPriceDifference()", () => {
    it("should return price difference of selected cryptocurrency", () => {
      const spotPrice = TEST_STATE_PRICE.spot.BTC;
      const oldPrice = TEST_STATE_PRICE.history["BTC-day"][0].price;
      const expectedDifference = spotPrice - oldPrice;
      expect(getSelectedPriceDifference(TEST_STATE)).toEqual(expectedDifference);
    });
  });

  describe("getSelectedPercentDifference()", () => {
    it("should return percentage difference of selected cryptocurrency", () => {
      const spotPrice = TEST_STATE_PRICE.spot.BTC;
      const oldPrice = TEST_STATE_PRICE.history["BTC-day"][0].price;
      const expectedPercentage = (spotPrice / oldPrice - 1) * 100;
      expect(getSelectedPercentDifference(TEST_STATE)).toEqual(expectedPercentage);
    });
  });
});
