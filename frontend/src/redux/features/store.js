// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from "../api/apiSlice";
// import authReducer from "./auth/authSlice";
// import favoritesReducer from "../../redux/features/favorites/favoriteSlice";
// import cartSliceReducer from "../features/cart/cartSlice";
// import shopReducer from "../features/shop/shopSlice";
// import { getFavoritesFromLocalStorage } from "../../Utils/localStorage";

// const initialFavorites = getFavoritesFromLocalStorage() || [];
// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//     favorites: favoritesReducer,
//     cart: cartSliceReducer,
//     shop: shopReducer,
//   },
//   preloadedState: {
//     favorites: initialFavorites,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// setupListeners(store.dispatch);
// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import authReducer from "./auth/authSlice";
import favoritesReducer from "../../redux/features/favorites/favoriteSlice";
import cartSliceReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage";
import { razorpayApiSlice } from "../api/razorpayApiSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [razorpayApiSlice.reducerPath]: razorpayApiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      razorpayApiSlice.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
