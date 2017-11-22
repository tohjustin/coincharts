import { createSelector } from "reselect";

export const getPriceData = state => state.price;
export const getPriceStatus = createSelector(
  getPriceData,
  price => price.status
);
export const getPriceHistory = createSelector(
  getPriceData,
  price => price.history
);
export const getPriceSpot = createSelector(getPriceData, price => price.spot);
