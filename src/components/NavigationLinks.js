// src/components/NavigationLinks.js
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const NavigationLinks = () => {
  return (
    <nav>
      <ul class = "links">
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
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
  },
};

export default NavigationLinks;
