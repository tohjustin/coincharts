import { SettingsActions } from "../actions";
import SettingsReducer from "../reducer";

const INITIAL_SETTINGS_STATE = {
  selectedCryptocurrency: "BTC",
  selectedCurrency: "USD",
  selectedDuration: "day",
};

describe("[Settings] Reducer", () => {
  it('handles "SELECT_CRYPTOCURRENCY" correctly', () => {
    const selectedCryptocurrency = "LTC";
    const action = SettingsActions.selectCryptocurrency(selectedCryptocurrency);
    const nextState = SettingsReducer(INITIAL_SETTINGS_STATE, action);

    expect(INITIAL_SETTINGS_STATE).not.toEqual(selectedCryptocurrency);
    expect(nextState.selectedCryptocurrency).toEqual(selectedCryptocurrency);
  });

  it('handles "SELECT_CURRENCY" correctly', () => {
    const selectedCurrency = "USD";
    const action = SettingsActions.selectCurrency(selectedCurrency);
    const nextState = SettingsReducer(INITIAL_SETTINGS_STATE, action);

    expect(INITIAL_SETTINGS_STATE).not.toEqual(selectedCurrency);
    expect(nextState.selectedCurrency).toEqual(selectedCurrency);
  });

  it('handles "SELECT_DURATION" correctly', () => {
    const selectedDuration = "year";
    const action = SettingsActions.selectDuration(selectedDuration);
    const nextState = SettingsReducer(INITIAL_SETTINGS_STATE, action);

    expect(INITIAL_SETTINGS_STATE).not.toEqual(selectedDuration);
    expect(nextState.selectedDuration).toEqual(selectedDuration);
  });
});
