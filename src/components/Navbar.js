import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import NavigationLinks from "./NavigationLinks";
import "./Nav.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { setSearchQuery } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchQuery(value); // ✅ Cập nhật ProductContext ngay khi nhập
    if (value.trim() !== "") {
      navigate("/search"); // ✅ Chỉ điều hướng khi có từ khóa
    }
  };
  //  ✅ Khi load lại trang, giữ nguyên searchQuery mà ko cần đăng nhập lại hoặ khi load lại trangss
   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Kiểm tra xem user đã đăng nhập chưa
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="logo-section">
          <h2 className="logo">
            {/* <Link to="/" className="logo-link"> */}
              <img src={logo} alt="Logo" className="logo-image" />
              Velina Jewelry
            {/* </Link> */}
          </h2>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/cart" className="cart-link">🛒 Giỏ hàng</Link>
          </li>
          <li>
            {user ? (
              <div className="user-section">
                <span>👤 {user.name}</span>
                <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
              </div>
            ) : (
              <Link to="/login" className="nav-links">🔑 Đăng nhập / Đăng ký</Link>
            )}
          </li>
        </ul>
      </div>

      <div className="navbar-bottom">
        <NavigationLinks />
        <p style={{fontSize: "20px"}}> Liên hệ: 19000000</p>
      </div>
    </nav>
  );
};

export default Navbar;
