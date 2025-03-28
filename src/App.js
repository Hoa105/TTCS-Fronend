// import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import SearchResults from "./pages/SearchResults";
import LoginPage from "./pages/LoginPage"; // Thêm trang đăng nhập
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProductProvider } from "./context/ProductContext"; // Import Provider

function App() {
  return (
    <ProductProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage />} /> {/* Thêm đăng nhập */}
        <Route path="/register" element={<RegisterPage />} /> {/* Thêm đăng ký */}
      </Routes>
      <Footer />
    </ProductProvider>
  );
}

export default App;



