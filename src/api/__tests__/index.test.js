import check from "check-types";

import { CRYPTOCURRENCY_LIST } from "../../constants";
import { getPriceHistoryUrl, getSpotPriceUrl, fetchPriceHistory, fetchSpotPrices } from "../";

describe("api", () => {
  let INITIAL_NODE_ENV;

  beforeEach(() => {
    jest.mock("../__mocks__/axios");
    INITIAL_NODE_ENV = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = INITIAL_NODE_ENV;
  });

  describe("getPriceHistoryUrl()", () => {
    it("returns correct url (process.env = development)", () => {
      process.env.NODE_ENV = "development";

      const testCases = [
        { input: ["BTC", "USD", "hour"], expected: "./priceData/BTC-USD-hour.json" },
        { input: ["BCH", "CAD", "day"], expected: "./priceData/BCH-CAD-day.json" },
        { input: ["ETH", "SGD", "week"], expected: "./priceData/ETH-SGD-week.json" },
        { input: ["LTC", "RMB", "month"], expected: "./priceData/LTC-RMB-month.json" },
        { input: ["XMR", "YEN", "year"], expected: "./priceData/XMR-YEN-year.json" },
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
          input: ["BTC", "USD", "hour"],
          expected: "https://www.coinbase.com/api/v2/prices/BTC-USD/historic?period=hour",
        },
        {
          input: ["BCH", "CAD", "day"],
          expected: "https://www.coinbase.com/api/v2/prices/BCH-CAD/historic?period=day",
        },
        {
          input: ["ETH", "SGD", "week"],
          expected: "https://www.coinbase.com/api/v2/prices/ETH-SGD/historic?period=week",
        },
        {
          input: ["LTC", "RMB", "month"],
          expected: "https://www.coinbase.com/api/v2/prices/LTC-RMB/historic?period=month",
        },
        {
          input: ["XMR", "YEN", "year"],
          expected: "https://www.coinbase.com/api/v2/prices/XMR-YEN/historic?period=year",
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
        { input: ["USD"], expected: "./priceData/USD-spot.json" },
        { input: ["CAD"], expected: "./priceData/CAD-spot.json" },
        { input: ["SGD"], expected: "./priceData/SGD-spot.json" },
        { input: ["RMB"], expected: "./priceData/RMB-spot.json" },
        { input: ["YEN"], expected: "./priceData/YEN-spot.json" },
      ];

      testCases.forEach(testCase => {
        const result = getSpotPriceUrl(...testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });

    it("returns correct url (process.env = production)", () => {
      process.env.NODE_ENV = "production";

      const testCases = [
        { input: ["USD"], expected: "https://api.coinbase.com/v2/prices/USD/spot?" },
        { input: ["CAD"], expected: "https://api.coinbase.com/v2/prices/CAD/spot?" },
        { input: ["SGD"], expected: "https://api.coinbase.com/v2/prices/SGD/spot?" },
        { input: ["RMB"], expected: "https://api.coinbase.com/v2/prices/RMB/spot?" },
        { input: ["YEN"], expected: "https://api.coinbase.com/v2/prices/YEN/spot?" },
      ];

      testCases.forEach(testCase => {
        const result = getSpotPriceUrl(...testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe("fetchPriceHistory()", () => {
    it("should resolve to an array", async () => {
      const result = await fetchPriceHistory("BTC", "USD", "hour");
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
      const result = await fetchPriceHistory("BTC", "USD", "hour");

      expect(isSortedByTimeAscending(result)).toEqual(true);
    });

    it("should resolve to an array, with `price` & `time` parsed into `Number` & `Date` respectively", async () => {
      const result = await fetchPriceHistory("BTC", "USD", "hour");
      result.forEach(({ price, time }) => {
        expect(check.number(price)).toEqual(true);
        expect(check.date(time)).toEqual(true);
      });
    });
  });

  describe("fetchSpotPrices()", () => {
    it("should resolve to an array, one entry for each supported cryptocurrency", async () => {
      const result = await fetchSpotPrices("USD");
      expect(check.array(result)).toEqual(true);
      expect(result.length).toEqual(CRYPTOCURRENCY_LIST.length);
    });

    it("should resolve to an array, with `amount` parsed into `Number`", async () => {
      const result = await fetchSpotPrices("USD");
      result.forEach(({ amount }) => {
        expect(check.number(amount)).toEqual(true);
      });
    });
  });
});
