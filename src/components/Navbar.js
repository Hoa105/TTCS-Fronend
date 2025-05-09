import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";
import "./../assets/css/Nav.css";
import logo from "../assets/images/logo.png";

// 👉 import từ redux
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../slices/productsSlice";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Theo dõi location để cập nhật user (tránh cache lỗi)
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData && userData !== "undefined") {
      try {
        const storedUser = JSON.parse(userData);
        setUser(storedUser || null);
      } catch (error) {
        console.error("Error parsing user from localStorage in Navbar:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    dispatch(setSearchQuery(value)); //  gửi query lên Redux

    if (value.trim() !== "") {
      navigate("/search");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="logo-section">
          <h2 className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
            Venila Jewelry
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
            <Link to="/cart" className="cart-link">
              {" "}
              🛒{" "}
            </Link>
          </li>
          <li>
            {user ? (
              <div className="user-section">
                <Link to="/acount/user" className="user-link">
                  👤 {user.username}
                </Link>
              </div>
            ) : (
              <Link to="/login" className="nav-links">
                {" "}
                👤{" "}
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="navbar-bottom">
        <NavigationLinks />
      </div>
    </nav>
  );
};

export default Navbar;
