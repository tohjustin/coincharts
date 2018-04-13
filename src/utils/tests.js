import React from "react";
import { Provider } from "react-redux";
import { render } from "react-testing-library"; // eslint-disable-line import/no-extraneous-dependencies
import configureStore from "../store/configureStore";

export function renderWithReduxStore(ui, { store = configureStore().store } = {}) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

export default {
  renderWithReduxStore,
};
