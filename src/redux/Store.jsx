import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/reducerSlice/CartSlice";
import wishlistReducer from "../redux/reducerSlice/WishlistSlice";
import userReducer from "../redux/reducerSlice/UserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [logger],
});

export const persistor = persistStore(store);
