/**
 * Generic Constants
 */
const SELECT_CRYPTOCURRENCY = "SETTINGS:SELECT_CRYPTOCURRENCY";
const SELECT_CURRENCY = "SETTINGS:SELECT_CURRENCY";
const SELECT_DURATION = "SETTINGS:SELECT_DURATION";

/**
 * Helper Functions
 */
export function generateActionCreator(type, payload = {}) {
  return { type, payload: { ...payload } };
}

/**
 * Action Types
 */
export const SettingsActionTypes = {
  SELECT_CRYPTOCURRENCY,
  SELECT_CURRENCY,
  SELECT_DURATION,
};

/**
 * Action Creators
 */
export const SettingsActions = {
  selectCryptocurrency: cryptocurrency =>
    generateActionCreator(SettingsActionTypes.SELECT_CRYPTOCURRENCY, {
      cryptocurrency,
    }),
  selectCurrency: currency => generateActionCreator(SettingsActionTypes.SELECT_CURRENCY, { currency }),
  selectDuration: duration => generateActionCreator(SettingsActionTypes.SELECT_DURATION, { duration }),
};
