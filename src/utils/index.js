import axios from 'axios';
import currencyFormatter from 'currency-formatter';

import {
  PRICE_DATA_PATH,
} from '../constants';

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

/**
 * Adds the appropriate symbol & separators to `rawCurrencyString` based on the input `currencyCode`
 * @param {string} rawCurrencyString
 * @param {string} currencyCode
 * @returns Formatted currency string
 */
function formatCurrency(rawCurrencyString, currencyCode) {
  return currencyFormatter.format(rawCurrencyString, {
    code: currencyCode.toUpperCase(),
  });
}

 /**
 * Returns `rawString`, prepended with a `+` symbol if `numericValue` is a positive number
 * @param {string} rawNumericString
 * @param {number} numericValue
 * @returns Formatted string
 */
function prependPlusSymbol(rawString, numericValue) {
  return (numericValue > 0) ? `+${rawString}` : rawString;
}

export {
  prependPlusSymbol,
  fetchPriceData,
  fetchSpotPrices,
  formatCurrency,
};
