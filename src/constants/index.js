// Supported cryptocurrencies
const CRYPTOCURRENCY = {
  BTC: { key: 'btc', name: 'Bitcoin', fillColor: '#FFEBC5', strokeColor: '#FFB01E' },
  BCH: { key: 'bch', name: 'Bitcoin Cash', fillColor: '#e2f0d2', strokeColor: '#8DC451' },
  ETH: { key: 'eth', name: 'Ethereum', fillColor: '#F0F1F8', strokeColor: '#6E7CB9' },
  LTC: { key: 'ltc', name: 'Litecoin', fillColor: '#ECECEC', strokeColor: '#B5B5B5' },
};

// Supported Currencies
const CURRENCY = {
  cad: { key: 'cad', name: 'Canadian Dollar' },
  usd: { key: 'usd', name: 'US Dollar' },
};

// Time duration constants
const DURATION = {
  HOUR: { key: 'hour', codename: '1H', humanize: 'since an hour ago' },
  DAY: { key: 'day', codename: '1D', humanize: 'since yesterday' },
  WEEK: { key: 'week', codename: '1W', humanize: 'since last week' },
  MONTH: { key: 'month', codename: '1M', humanize: 'since last month' },
  YEAR: { key: 'year', codename: '1Y', humanize: 'since last year' },
  ALL: { key: 'all', codename: 'ALL', humanize: '' },
};

// Directory where price data (.json files) are stored
const LOCAL_JSON_DATA_DIR = './priceData';

// Polls the API endpoint every minute to update prices
const POLL_FREQUENCY = 60 * 1000;

export { CURRENCY, CRYPTOCURRENCY, DURATION, LOCAL_JSON_DATA_DIR, POLL_FREQUENCY };
