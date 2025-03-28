import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Dùng `react-dom/client` thay vì `react-dom`
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Sử dụng `createRoot`
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <ProductProvider> 
      <App /> 
    </ProductProvider> 
      {/* <App /> */}
    </BrowserRouter>
  // </React.StrictMode>
);
