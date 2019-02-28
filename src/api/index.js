import axios from "axios";
import get from "lodash.get";
import Raven from "raven-js";

import { LOCAL_JSON_DATA_DIR } from "../constants";

// Specify config defaults that will be applied to every request.
axios.defaults.headers["CB-VERSION"] = process.env.REACT_APP_COINBASE_API_CB_VERSION || "2018-04-13";

function getPriceHistoryUrl(cryptocurrency, currency, durationType) {
  return process.env.NODE_ENV !== "production"
    ? `${LOCAL_JSON_DATA_DIR}/${cryptocurrency}-${currency}-${durationType}.json`
    : `https://www.coinbase.com/api/v2/prices/${cryptocurrency}-${currency}/historic?period=${durationType}`;
}

function getSpotPriceUrl(currency) {
  return process.env.NODE_ENV !== "production"
    ? `${LOCAL_JSON_DATA_DIR}/${currency}-spot.json`
    : `https://api.coinbase.com/v2/prices/${currency}/spot?`;
}

async function fetchPriceHistory(cryptocurrency, currency, durationType) {
  const url = getPriceHistoryUrl(cryptocurrency, currency, durationType);

  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    Raven.captureException(error);
    throw error;
  }

  // Format response
  const priceHistory = get(response, ["data", "data", "prices"], []);
  const formattedPriceHistory = priceHistory
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .map(e => ({ price: Number(e.price), time: new Date(e.time) }));

  return formattedPriceHistory;
}

async function fetchSpotPrices(currency) {
  const url = getSpotPriceUrl(currency);

  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    Raven.captureException(error);
    throw error;
  }

  // Format response
  const spotPrices = get(response, ["data", "data"], []);
  const formattedSpotPrices = spotPrices.map(e => ({
    ...e,
    amount: Number(e.amount),
  }));

  return formattedSpotPrices;
}

export { getPriceHistoryUrl, getSpotPriceUrl, fetchPriceHistory, fetchSpotPrices };
