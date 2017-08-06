import axios from 'axios';

import {
  DURATION,
  PRICE_DATA_PATH,
} from './constants';

function getPriceDataUrl(currency, type) {
  switch (currency) {
    case 'btc':
      return `${PRICE_DATA_PATH}/btc_usd_${type}.json`;
    case 'eth':
      return `${PRICE_DATA_PATH}/eth_usd_${type}.json`;
    case 'ltc':
      return `${PRICE_DATA_PATH}/ltc_usd_${type}.json`;
    default:
      return '';
  }
}

function fetchPriceData(currency, type) {
  const url = getPriceDataUrl(currency, type);
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        const { data } = res.data;
        resolve(data);
      })
      .catch(err => reject(err));
  });
}

function humanizeDuration(duration) {
  switch (duration) {
    case DURATION.HOUR:
      return 'since an hour ago';
    case DURATION.DAY:
      return 'since yesterday';
    case DURATION.WEEK:
      return 'since last week';
    case DURATION.MONTH:
      return 'since last month';
    case DURATION.YEAR:
      return 'since last year';
    default:
      return '';
  }
}

export {
  fetchPriceData,
  humanizeDuration,
};
