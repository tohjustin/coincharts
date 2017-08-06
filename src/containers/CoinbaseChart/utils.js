import axios from 'axios';

const PRICE_DATA_PATH = './priceData';

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

export {
  fetchPriceData,
};
