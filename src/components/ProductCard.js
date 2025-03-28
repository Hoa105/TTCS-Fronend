import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ProductContext);

  return (
    <div className="product-card">
      {/* Bọc hình ảnh và tên sản phẩm trong Link để điều hướng */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>Giá: {product.price} VND</p>
      <button onClick={() => addToCart(product)}>🛒 Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductCard;




