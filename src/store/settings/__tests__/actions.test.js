import { SettingsActions, SettingsActionTypes } from "../actions";

describe("[Settings] Actions", () => {
  describe("generateActionCreator() ", () => {
    it('should create a "SELECT_CRYPTOCURRENCY" action', () => {
      const expectedAction = {
        type: SettingsActionTypes.SELECT_CRYPTOCURRENCY,
        payload: { cryptocurrency: "BCH" },
      };

      expect(SettingsActions.selectCryptocurrency("BCH")).toEqual(expectedAction);
    });

    it('should create a "SELECT_CURRENCY" action', () => {
      const expectedAction = {
        type: SettingsActionTypes.SELECT_CURRENCY,
        payload: { currency: "USD" },
      };

      expect(SettingsActions.selectCurrency("USD")).toEqual(expectedAction);
    });

    it('should create a "SELECT_DURATION" action', () => {
      const expectedAction = {
        type: SettingsActionTypes.SELECT_DURATION,
        payload: { duration: "day" },
      };

      expect(SettingsActions.selectDuration("day")).toEqual(expectedAction);
    });
  });
});
