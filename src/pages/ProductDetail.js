import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; 

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(ProductContext); // Lấy hàm addToCart từ context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedProduct = {
          id: data.id,
          name: data.title,
          price: data.price,
          image: data.image,
          category: data.category,
          description: data.description, // Lấy mô tả sản phẩm
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
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "200px" }} />
      <p>Giá: {product.price.toLocaleString()}₫</p>
      <p>Mô tả: {product.description}</p>
      <button onClick={() => addToCart(product)}>🛒 Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductDetail;
