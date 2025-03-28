// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import NavigationLinks from "./NavigationLinks";
// import "./Navbar.css";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search?query=${searchTerm}`);
//     }
//   };

//   // Kiểm tra xem user đã đăng nhập chưa
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   // Xử lý đăng xuất
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <nav style={styles.navbar}>
//       <h2 style={styles.logo}>
//         <Link to="/" style={styles.link}>Trang chủ</Link>
//       </h2>

//        {/* Ô tìm kiếm */}
//       <form onSubmit={handleSearch} style={styles.searchForm}>
//         <input 
//           type="text" 
//           placeholder="Tìm kiếm sản phẩm..." 
//           value={searchTerm} 
//           onChange={(e) => setSearchTerm(e.target.value)} 
//           style={styles.searchInput}
//         />
//         <button type="submit" style={styles.searchButton}>🔍</button>
//       </form>

//       {/* Danh mục sản phẩm */}
//       <NavigationLinks />

//       <ul style={styles.navLinks}>
//         <li>
//           <Link to="/cart" style={styles.link}>🛒 Giỏ hàng</Link>
//         </li>
//         <li>
//           {user ? (
//             <div style={styles.userSection}>
//               <span>👤 {user.name}</span>
//               <button onClick={handleLogout} style={styles.logoutButton}>Đăng xuất</button>
//             </div>
//           ) : (
//             <Link to="/login" style={styles.link}>🔑 Đăng nhập / Đăng ký</Link>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// const styles = {
//   navbar: { 
//     display: "flex", 
//     alignItems: "center",  // Căn giữa theo chiều dọc 
//     justifyContent: "space-between", 
//     padding: "10px 20px", 
//     backgroundColor: "#f8f8f8" 
//   },
//   logo: { 
//     margin: 0, 
//     fontSize: "24px", 
//     fontWeight: "bold" 
//   },
//   searchContainer: { 
//     display: "flex", 
//     alignItems: "center",  // Căn giữa input với icon 
//     gap: "5px" 
//   },
//   searchInput: { 
//     padding: "5px", 
//     border: "1px solid #ccc", 
//     borderRadius: "5px" 
//   },
//   navLinks: { 
//     listStyle: "none", 
//     display: "flex", 
//     alignItems: "center",  // Căn giữa icon và chữ 
//     gap: "15px", 
//     margin: 0, 
//     padding: 0 
//   },
//   link: { 
//     textDecoration: "none", 
//     color: "#6d168d", 
//     fontWeight: "bold", 
//     fontSize: "18px", 
//     display: "flex", 
//     alignItems: "center", // Đảm bảo icon với chữ thẳng hàng
//     gap: "5px" 
//   },
//   userSection: { 
//     display: "flex", 
//     alignItems: "center", 
//     gap: "15px" 
//   },
//   logoutButton: { 
//     background: "red", 
//     color: "#fff", 
//     border: "none", 
//     padding: "5px 10px", 
//     cursor: "pointer", 
//     borderRadius: "5px" 
//   }
// };


// export default Navbar;
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import NavigationLinks from "./NavigationLinks";
import "./Navbar.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { setSearchQuery } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
   const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const trimmedSearch = searchTerm.trim();
  //   if (!trimmedSearch) return;
  //   setSearchQuery(trimmedSearch); // ✅ Cập nhật vào ProductContext
  //   navigate("/search");
  // };

  // useEffect(() => {
  //   setSearchTerm(""); // Reset khi load lại trang
  // }, []);

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
  // return (
  //   <nav className="navbar">
  //     <h2 className="logo">
  //     <Link to="/" className="logo-link">
  //       <img src={logo} alt="Logo" className="logo-image" /> {/* Add the logo image here */}
  //       Velina Jewelry
  //     </Link>
  //     </h2>

  //      {/* Ô tìm kiếm */}
  //     {/* <form onSubmit={handleSearch} className="search-container"> */}
  //     <div className="search-container"></div>
  //       <input 
  //         type="text" 
  //         placeholder="Tìm kiếm sản phẩm..." 
  //         value={searchTerm} 
  //         onChange={handleSearchChange}
  //         // onChange={(e) => setSearchTerm(e.target.value)} 
  //         className="search-input"
  //         // style={styles.searchInput}
  //       />
        // <button type="submit" className="search-button">
        //   <i className="fas fa-search"></i>
        // </button>
  //     <div />
  //     {/* </form> */}

  //     {/* Danh mục sản phẩm */}
  //     <NavigationLinks />

      // <ul className="nav-links">
      //   <li>
      //     <Link to="/cart" className="nav-links a">🛒 Giỏ hàng</Link>
      //   </li>
      //   <li>
      //     {user ? (
      //       <div className="user-section">
      //         <span>👤 {user.name}</span>
      //         <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
      //       </div>
      //     ) : (
      //       <Link to="/login" className="nav-links a">🔑 Đăng nhập / Đăng ký</Link>
      //     )}
      //   </li>
      // </ul>
  //   </nav>
  // );
};

export default Navbar;
