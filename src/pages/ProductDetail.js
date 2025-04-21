import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/productsSlice";
import "./../assets/css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8081/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const p = data.results;
        const formattedProduct = {
          id: p.id,
          name: p.name,
          price: parseFloat(p.price),
          image: p.image,
          category: p.category,
          description: p.description,
        };
        setProduct(formattedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!product) return <p>Sản phẩm không tồn tại!</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-price">{product.price.toLocaleString()} ₫</p>
        <p className="product-description">{product.description}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          🛒 Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
