import check from "check-types";

import { CRYPTOCURRENCY_LIST } from "../constants";
import { getPriceHistoryUrl, getSpotPriceUrl, fetchPriceHistory, fetchSpotPrices } from "./index";

describe("api", () => {
  let INITIAL_NODE_ENV;

  beforeEach(() => {
    jest.mock("./__mocks__/axios");
    INITIAL_NODE_ENV = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = INITIAL_NODE_ENV;
  });

  describe("getPriceHistoryUrl()", () => {
    it("returns correct url (process.env = development)", () => {
      process.env.NODE_ENV = "development";

      const testCases = [
        { input: ["btc", "usd", "hour"], expected: "./priceData/btc-usd_hour.json" },
        { input: ["bch", "cad", "day"], expected: "./priceData/bch-cad_day.json" },
        { input: ["eth", "sgd", "week"], expected: "./priceData/eth-sgd_week.json" },
        { input: ["ltc", "rmb", "month"], expected: "./priceData/ltc-rmb_month.json" },
        { input: ["xmr", "yen", "year"], expected: "./priceData/xmr-yen_year.json" },
      ];

      testCases.forEach(testCase => {
        const result = getPriceHistoryUrl(...testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });

    it("returns correct url (process.env = production)", () => {
      process.env.NODE_ENV = "production";

      const testCases = [
        {
          input: ["btc", "usd", "hour"],
          expected: "https://www.coinbase.com/api/v2/prices/btc-usd/historic?period=hour",
        },
        {
          input: ["bch", "cad", "day"],
          expected: "https://www.coinbase.com/api/v2/prices/bch-cad/historic?period=day",
        },
        {
          input: ["eth", "sgd", "week"],
          expected: "https://www.coinbase.com/api/v2/prices/eth-sgd/historic?period=week",
        },
        {
          input: ["ltc", "rmb", "month"],
          expected: "https://www.coinbase.com/api/v2/prices/ltc-rmb/historic?period=month",
        },
        {
          input: ["xmr", "yen", "year"],
          expected: "https://www.coinbase.com/api/v2/prices/xmr-yen/historic?period=year",
        },
      ];

      testCases.forEach(testCase => {
        const result = getPriceHistoryUrl(...testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe("getSpotPriceUrl()", () => {
    it("returns correct url (process.env = development)", () => {
      process.env.NODE_ENV = "development";

      const testCases = [
        { input: ["usd"], expected: "./priceData/usd_spot.json" },
        { input: ["cad"], expected: "./priceData/cad_spot.json" },
        { input: ["sgd"], expected: "./priceData/sgd_spot.json" },
        { input: ["rmb"], expected: "./priceData/rmb_spot.json" },
        { input: ["yen"], expected: "./priceData/yen_spot.json" },
      ];

      testCases.forEach(testCase => {
        const result = getSpotPriceUrl(...testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });

    it("returns correct url (process.env = production)", () => {
      process.env.NODE_ENV = "production";

      const testCases = [
        { input: ["usd"], expected: "https://api.coinbase.com/v2/prices/usd/spot?" },
        { input: ["cad"], expected: "https://api.coinbase.com/v2/prices/cad/spot?" },
        { input: ["sgd"], expected: "https://api.coinbase.com/v2/prices/sgd/spot?" },
        { input: ["rmb"], expected: "https://api.coinbase.com/v2/prices/rmb/spot?" },
        { input: ["yen"], expected: "https://api.coinbase.com/v2/prices/yen/spot?" },
      ];

      testCases.forEach(testCase => {
        const result = getSpotPriceUrl(...testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe("fetchPriceHistory()", () => {
    it("should resolve to an array", async () => {
      const result = await fetchPriceHistory("btc", "usd", "hour");
      expect(check.array(result)).toEqual(true);
    });

    it("should resolve to an array, sorted by `time` in increasing order", async () => {
      const isSortedByTimeAscending = arr => {
        if (arr.length > 1) {
          for (let i = 1; i < arr.length; i += 1) {
            if (arr[i].time < arr[i - 1].time) {
              return false;
            }
          }
        }

        return true;
      };
      const result = await fetchPriceHistory("btc", "usd", "hour");

      expect(isSortedByTimeAscending(result)).toEqual(true);
    });

    it("should resolve to an array, with `price` & `time` parsed into `Number` & `Date` respectively", async () => {
      const result = await fetchPriceHistory("btc", "usd", "hour");
      result.forEach(({ price, time }) => {
        expect(check.number(price)).toEqual(true);
        expect(check.date(time)).toEqual(true);
      });
    });
  });

  describe("fetchSpotPrices()", () => {
    it("should resolve to an array, one entry for each supported cryptocurrency", async () => {
      const result = await fetchSpotPrices("usd");
      expect(check.array(result)).toEqual(true);
      expect(result.length).toEqual(CRYPTOCURRENCY_LIST.length);
    });

    it("should resolve to an array, with `amount` parsed into `Number`", async () => {
      const result = await fetchSpotPrices("usd");
      result.forEach(({ amount }) => {
        expect(check.number(amount)).toEqual(true);
      });
    });
  });
});
