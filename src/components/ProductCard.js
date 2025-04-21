import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/productsSlice";
import "./../assets/css/ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>Giá: {product.price.toLocaleString()} ₫</p>
      <button
        className="button-card"
        onClick={() => dispatch(addToCart(product))}
      >
        🛒 Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductCard;
