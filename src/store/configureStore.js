import * as redux from "redux";

export default (initialState = {}) => {
  // Consolidate all reducers
  const reducer = redux.combineReducers({});

  // Disable Redux Devtools for production builds
  let store;
  if (process.env.NODE_ENV === "production") {
    store = redux.createStore(reducer, initialState);
  } else {
    store = redux.createStore(
      reducer,
      initialState,
      redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  }

  return store;
};
