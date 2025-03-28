// src/components/NavigationLinks.js
import React from "react";
import { Link } from "react-router-dom";

const NavigationLinks = () => {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "120px", listStyle: "none" }}>
        <li><Link to="/" style={styles.link}>Trang chủ</Link></li>
        <li><Link to="/search?category=ring" style={styles.link}>Nhẫn</Link></li>
        <li><Link to="/search?category=bracelet" style={styles.link}>Lắc - Vòng tay</Link></li>
        <li><Link to="/search?category=necklace" style={styles.link}>Dây chuyền - Vòng cổ</Link></li>
        <li><Link to="/search?category=earring" style={styles.link}>Bông tai</Link></li>
      </ul>
    </nav>
  );
};
const styles = {
  link: {
    textDecoration: "none", // Bỏ gạch chân
    color: "black", // Màu chữ tím
    // fontWeight: "bold", // Đậm chữ
    fontSize: "20px"
  },
};

export default NavigationLinks;
