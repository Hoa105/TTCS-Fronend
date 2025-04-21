import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Dùng `react-dom/client` thay vì `react-dom`
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { ProductProvider } from "./context/ProductContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./slices/productsSlice";
import cartReducer, { getTotals } from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { productsApi } from "./slices/productsApi";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(productsFetch());
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Sử dụng `createRoot`
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <App /> */}
  </BrowserRouter>
  // </React.StrictMode>
);
