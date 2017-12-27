import axios from 'axios';
import get from 'lodash.get';

import { LOCAL_JSON_DATA_DIR } from '../constants';

function getPriceHistoryUrl(cryptocurrency, currency, durationType) {
  if (process.env.NODE_ENV !== 'production') {
    return `${LOCAL_JSON_DATA_DIR}/${cryptocurrency}-${currency}_${durationType}.json`;
  }

  return `https://www.coinbase.com/api/v2/prices/${cryptocurrency}-${currency}/historic?period=${durationType}`;
}

function getSpotPriceUrl(currency) {
  if (process.env.NODE_ENV !== 'production') {
    return `${LOCAL_JSON_DATA_DIR}/${currency}_spot.json`;
  }

  return `https://api.coinbase.com/v2/prices/${currency}/spot?`;
}

function fetchPriceHistory(cryptocurrency, currency, durationType) {
  const url = getPriceHistoryUrl(cryptocurrency, currency, durationType);

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const priceHistory = get(response, ['data', 'data', 'prices'], []);
        const formattedPriceHistory = priceHistory
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map(e => ({ price: +e.price, time: new Date(e.time) }));
        resolve(formattedPriceHistory);
      })
      .catch(err => reject(err));
  });
}

function fetchSpotPrices(currency) {
  const url = getSpotPriceUrl(currency);

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const spotPrices = get(response, ['data', 'data'], []);
        const formattedSpotPrices = spotPrices
          .filter(e => ['BTC', 'BCH', 'ETH', 'LTC'].indexOf(e.base) >= 0)
          .map(e => ({ ...e, amount: +e.amount }));
        resolve(formattedSpotPrices);
      })
      .catch(err => reject(err));
  });
}

export { fetchPriceHistory, fetchSpotPrices };
