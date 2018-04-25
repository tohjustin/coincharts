const MOCK_SPOT_PRICE = {
  data: [
    { base: "BTC", currency: "USD", amount: "13159.59" },
    { base: "BCH", currency: "USD", amount: "2316.23" },
    { base: "ETH", currency: "USD", amount: "719.30" },
    { base: "LTC", currency: "USD", amount: "218.61" },
  ],
};

const MOCK_PRICE_DATA = {
  data: {
    currency: "USD",
    prices: [
      { price: "218.89", time: "2017-12-31T13:00:00Z" },
      { price: "220.01", time: "2017-12-31T12:56:00Z" },
      { price: "220.01", time: "2017-12-31T12:52:00Z" },
      { price: "220.24", time: "2017-12-31T12:48:00Z" },
      { price: "220.47", time: "2017-12-31T12:44:00Z" },
      { price: "220.47", time: "2017-12-31T12:40:00Z" },
      { price: "218.92", time: "2017-12-31T12:36:00Z" },
      { price: "218.92", time: "2017-12-31T12:32:00Z" },
      { price: "217.06", time: "2017-12-31T12:28:00Z" },
      { price: "215.21", time: "2017-12-31T12:24:00Z" },
    ],
  },
};

const mockAxios = {
  defaults: {
    headers: {},
  },
  get(url) {
    return new Promise((resolve, reject) => {
      switch (true) {
        case url.indexOf("spot") >= 0:
          resolve({ data: MOCK_SPOT_PRICE });
          break;
        case url.indexOf("historic") >= 0 || url.indexOf("priceData") >= 0:
          resolve({ data: MOCK_PRICE_DATA });
          break;
        default:
          reject(new Error("Bad Request"));
          break;
      }
    });
  },
};

export default mockAxios;
