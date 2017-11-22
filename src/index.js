import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, Route, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import App from "./containers/App";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";

import "./reset.css";
import "./index.css";

const { store } = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/chart" component={App} params={{ id: "Jkei3c32" }} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
