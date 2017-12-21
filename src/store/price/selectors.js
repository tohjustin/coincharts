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

/**
 * Price History
 */
export const getPriceHistories = createSelector(
  getPrice,
  price => price.history
);

export const getSelectedPriceHistory = createSelector(
  getPriceHistories,
  SettingsSelectors.getSelectedCryptocurrency,
  SettingsSelectors.getSelectedDuration,
  (histories, selectedCryptocurrency, selectedDuration) => {
    const key = `${selectedCryptocurrency}-${selectedDuration}`;
    return histories[key];
  }
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
  }
);
