import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import articoliReducer from "./articoli/articoli.reducer";
import carrelloReducer from "./carrello/carrello.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
   key: 'main',
   storage,
   whitelist: ['cart']
}

const rootReducer = combineReducers({
   user: userReducer,
   cart: carrelloReducer,
   articoli: articoliReducer,
   
});

export default persistReducer(persistConfig, rootReducer);