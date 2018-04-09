import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Raven from "raven-js";

import DocumentHead from "./containers/DocumentHead";
import Footer from "./components/Footer";
import GithubCorner from "./components/GithubCorner";
import MainView from "./views/MainView";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";

import "./reset.css";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  Raven.config(process.env.REACT_APP_RAVEN_PUBLIC_DSN, {
    release: process.env.REACT_APP_VERSION,
  }).install();
}

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DocumentHead />
      <GithubCorner />
      <MainView />
      <Footer className="Footer" />
    </div>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
