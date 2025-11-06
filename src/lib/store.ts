import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
