import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import DocumentHead from "./containers/DocumentHead";
import Footer from "./components/Footer";
import MainView from "./views/MainView";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";

import "./reset.css";
import "./index.css";

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DocumentHead />
      <MainView />
      <Footer />
    </div>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
