import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Footer from "./components/Footer";
import Title from "./containers/Title";
import MainView from "./views/MainView";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";

import "./reset.css";
import "./index.css";

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Title />
      <MainView />
      <Footer />
    </div>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
