// import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchResults from "./components/SearchResults";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/acount/UserPage";
import ChangePass from "./pages/acount/ChangePass";
import ChangeUser from "./pages/acount/ChangeUser";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import { ProductProvider } from "./context/ProductContext"; // Import Provider
import Dashboard from "./components/admin/Dashboad";
import Summary from "./components/admin/Summary";
import Products from "./components/admin/Products";
import CreateProduct from "./components/admin/CreatedProduct";
import EditProduct from "./components/admin/EditProduct";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Oders";
import OrderDetail from "./components/admin/OrderDetail";
import "./styles.css";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    // <ProductProvider>
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/acount/user" element={<UserPage />} />
        <Route path="/acount/change-password" element={<ChangePass />} />
        <Route path="/acount/change-user" element={<ChangeUser />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="summary" element={<Summary />} />
          <Route path="products" element={<Products />}>
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
      {!isAdminPage && <Footer />}
    </>
    // </ProductProvider>
  );
}

export default App;
