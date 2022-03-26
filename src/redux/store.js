import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./root.reducer";

import createSagaMiddleware from "@redux-saga/core";

import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootSaga from "./root.saga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, thunk, sagaMiddleware];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);