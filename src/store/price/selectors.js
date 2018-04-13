import { scan } from "d3-array";
import { createSelector } from "reselect";

import { SettingsSelectors } from "../settings";

/**
 * Basic Selector(s)
 */
export const getPrice = state => state.price;

/**
 * Price Fetching Status
 */
export const getPriceStatus = createSelector(getPrice, price => price.status);
export const getPriceLoadingStatus = createSelector(getPrice, price => price.status.loading);

/**
 * Price History
 */
export const getPriceHistories = createSelector(getPrice, price => price.history);

export const getSelectedPriceHistory = createSelector(
  getPriceHistories,
  SettingsSelectors.getSelectedCryptocurrency,
  SettingsSelectors.getSelectedDuration,
  (histories, selectedCryptocurrency, selectedDuration) => {
    const key = `${selectedCryptocurrency}-${selectedDuration}`;
    return histories[key];
  },
);

/**
 * Spot Price
 */
export const getSpotPrices = createSelector(getPrice, price => price.spot);

export const getSelectedSpotPrice = createSelector(
  getSpotPrices,
  SettingsSelectors.getSelectedCryptocurrency,
  (spotPrices, selectedCryptocurrency) => {
    const key = `${selectedCryptocurrency}`;
    return spotPrices[key];
  },
);

/*
 * Computed Values
 */
export const getSelectedPriceDifference = createSelector(
  getSelectedPriceHistory,
  getSelectedSpotPrice,
  (priceHistory = [], spotPrice) => {
    const lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
    const oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;
    return spotPrice - oldPrice;
  },
);

export const getSelectedPercentDifference = createSelector(
  getSelectedPriceHistory,
  getSelectedSpotPrice,
  (priceHistory = [], spotPrice) => {
    const lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
    const oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;
    return (spotPrice / oldPrice - 1) * 100 || 0;
  },
);
