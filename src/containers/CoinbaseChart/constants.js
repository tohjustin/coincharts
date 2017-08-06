// Supported cryptocurrencies
const CRYPTOCURRENCY = {
  BTC: { key: 'btc', name: 'Bitcoin' },
  ETH: { key: 'eth', name: 'Ethereum' },
  LTC: { key: 'ltc', name: 'Litecoin' },
};

// Supported Currencies
const CURRENCY = {
  CAD: { key: 'CAD', name: 'Canadian Dollar' },
  USD: { key: 'USD', name: 'US Dollar' },
};

// Time duration constants
const DURATION = {
  DAY: { key: 'day', codename: '1D', humanize: 'since an hour ago' },
  HOUR: { key: 'hour', codename: '1H', humanize: 'since yesterday' },
  MONTH: { key: 'month', codename: '1M', humanize: 'since last week' },
  WEEK: { key: 'week', codename: '1W', humanize: 'since last month' },
  YEAR: { key: 'year', codename: '1Y', humanize: 'since last year' },
  ALL: { key: 'all', codename: 'ALL', humanize: '' },
};

// Directory where price data (.json files) are stored
const PRICE_DATA_PATH = './priceData';

export {
  CURRENCY,
  CRYPTOCURRENCY,
  DURATION,
  PRICE_DATA_PATH,
};
