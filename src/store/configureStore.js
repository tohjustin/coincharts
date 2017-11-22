import {
  routerMiddleware as createRouterMiddleware,
  routerReducer
} from "react-router-redux";
import { browserHistory } from "react-router";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { PriceReducer, PriceSaga } from "../store/price";

export default (initialState = {}) => {
  // Consolidate all reducers
  const rootReducer = combineReducers({
    routing: routerReducer,
    price: PriceReducer
  });

  // Consolidate all middleware
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(browserHistory);
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware, sagaMiddleware)
  );

  // Disable Redux Devtools for production builds
  const store = createStore(rootReducer, initialState, enhancer);

  return {
    store,
    runSaga: sagaMiddleware.run(PriceSaga)
  };
};
