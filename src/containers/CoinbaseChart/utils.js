import axios from 'axios';

import {
  PRICE_DATA_PATH,
} from './constants';

function fetchPriceData(cryptocurrency, currency, type) {
  const jsonFileName = `${cryptocurrency}_${currency}_${type}.json`;
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

export {
  fetchPriceData,
};
