// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";

// import rootReducer from "./reducers";

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk));
export let persistor = persistStore(store);
