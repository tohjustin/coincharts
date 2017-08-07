import axios from 'axios';

import {
  PRICE_DATA_PATH,
} from './constants';

function fetchPriceData(cryptocurrency, currency, durationType) {
  const jsonFileName = `${cryptocurrency}_${currency}_${durationType}.json`;
  const jsonFilePath = `${PRICE_DATA_PATH}/${jsonFileName}`;

  return new Promise((resolve, reject) => {
    axios.get(jsonFilePath)
      .then((res) => {
        const { data } = res.data;
        resolve(data);
      })
      .catch(err => reject(err));
  });
}

function fetchSpotPrices(cryptocurrencyList, currency) {
  const promises = cryptocurrencyList.map(e => fetchPriceData(e.key, currency, 'spot'));
  return Promise.all(promises);
}

function appendPlusSignIfPositive(string, numericValue) {
  return (numericValue > 0) ? `+${string}` : string;
}

export {
  appendPlusSignIfPositive,
  fetchPriceData,
  fetchSpotPrices,
};
