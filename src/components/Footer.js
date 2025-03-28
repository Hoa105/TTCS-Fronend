import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2025 Trang Sức Xinh. Tất cả quyền được bảo lưu.</p>
      <div style={styles.socialLinks}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "20px",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#f1f1f1",
  },
  socialLinks: {
    marginTop: "5px",
  }
};

export default Footer;
