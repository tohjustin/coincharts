import { createSelector } from "reselect";

export const getSettingsData = state => state.settings;

export const getSelectedCryptocurrency = createSelector(getSettingsData, settings => settings.selectedCryptocurrency);

export const getSelectedCurrency = createSelector(getSettingsData, settings => settings.selectedCurrency);

export const getSelectedDuration = createSelector(getSettingsData, settings => settings.selectedDuration);
