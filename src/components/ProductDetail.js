// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../slices/cartSilce";
// import "./../assets/css/ProductDetail.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/products/${id}`);

//         const data = await response.json();
//         setProduct(data.results);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, [id]);

//   if (!product) return <p>Sản phẩm không tồn tại!</p>;

//   return (
//     <div className="product-detail-container">
//       <div className="product-image">
//         <img src={product.image} alt={product.name} />
//       </div>

//       <div className="product-info">
//         <h1 className="product-name">{product.name}</h1>
//         <p className="product-price">{product.price.toLocaleString()} ₫</p>
//         <p className="product-description">{product.description}</p>
//         <p className="product-material">Chất liệu: {product.material}</p>
//         <p>Size: {product.size}</p>
//         <button
//           className="add-to-cart-btn"
//           onClick={() => dispatch(addToCart(product))}
//         >
//           🛒 Thêm vào giỏ hàng
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSilce"; // Đổi tên slice nếu cần
import "./../assets/css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null); // State để lưu size được chọn

  useEffect(() => {
    const fetchProduct = async () => {
      // Đổi tên hàm fetch cho rõ ràng hơn
      try {
        const response = await fetch(`http://localhost:8081/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Giả sử API trả về sản phẩm trong data.results hoặc trực tiếp data
        const productData = data.results || data;
        setProduct(productData);
        // Tự động chọn size đầu tiên nếu có variants
        if (
          productData?.variants &&
          productData.variants.length > 0 &&
          productData.variants[0] !== null
        ) {
          setSelectedVariant(productData.variants[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null); // Đặt lại product thành null nếu có lỗi
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Vui lòng chọn size sản phẩm.");
      return;
    }
    if (selectedVariant.quantity <= 0) {
      alert("Size này hiện đã hết hàng.");
      return;
    }
    // Tạo một đối tượng sản phẩm mới bao gồm thông tin size và số lượng được chọn
    // để gửi vào giỏ hàng
    const productToAdd = {
      ...product,
      selectedSize: selectedVariant.size,
      // Các thông tin khác bạn muốn thêm vào cart item
      // Ví dụ: có thể chỉ cần id, name, price, image, size, quantity=1
      cartItemId: `${product.id}-${selectedVariant.size}`, // Tạo ID duy nhất cho item trong giỏ hàng theo size
      price: product.price, // Đảm bảo giá đúng
      maxQuantity: selectedVariant.quantity,
      quantity: 1, // Mặc định thêm 1 sản phẩm vào giỏ
    };
    dispatch(addToCart(productToAdd));
  };

  // --- Render Loading hoặc Not Found ---
  if (product === null) {
    // Có thể thêm trạng thái loading ở đây
    return <p>Đang tải thông tin sản phẩm...</p>;
  }

  if (!product || !product.id) {
    // Kiểm tra kỹ hơn nếu product không hợp lệ
    return <p>Sản phẩm không tồn tại!</p>;
  }
  // --- Kết thúc Render Loading hoặc Not Found ---

  // --- Kiểm tra và hiển thị Variants ---
  const renderVariants = () => {
    // Kiểm tra xem variants có phải là mảng hợp lệ không
    if (
      !Array.isArray(product.variants) ||
      product.variants.length === 0 ||
      product.variants[0] === null
    ) {
      // Nếu không có variants hoặc variants rỗng/null, có thể hiển thị thông báo
      // hoặc xử lý logic cho sản phẩm không có size (nếu có)
      // Trong trường hợp này, ta sẽ không hiển thị phần chọn size
      // và nút Add to Cart có thể cần xử lý khác đi
      return <p>Sản phẩm này hiện chưa có thông tin size.</p>; // Hoặc return null nếu không muốn hiển thị gì
    }

    return (
      <div className="product-variants">
        <p>
          <strong>Chọn Size:</strong>
        </p>
        {product.variants.map((variant) => (
          <input
            type="button"
            key={`${product.id}-${variant.size}`}
            className={`variant-button ${
              selectedVariant?.size === variant.size ? "selected" : ""
            } ${variant.quantity <= 0 ? "disabled" : ""}`}
            onClick={() => {
              if (variant.quantity > 0) {
                setSelectedVariant(variant);
              }
            }}
            disabled={variant.quantity <= 0} // Vô hiệu hóa nút nếu hết hàng
            title={
              variant.quantity <= 0
                ? "Hết hàng"
                : `Còn ${variant.quantity} sản phẩm`
            } // Thêm tooltip
            value={`${variant.size}${
              variant.quantity <= 0 ? " (Hết hàng)" : ""
            }`} // Nội dung hiển thị trên nút
          />
        ))}
        {/* {selectedVariant && <p>Số lượng còn lại: {selectedVariant.quantity}</p>} */}
      </div>
    );
  };
  // --- Kết thúc Kiểm tra và hiển thị Variants ---

  return (
    <div className="product-detail-container">
      <div className="product-image">
        {/* Thêm kiểm tra product.image tồn tại */}
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        {/* Đảm bảo product.price tồn tại trước khi gọi toLocaleString */}
        <p className="product-price">
          {product.price ? `${product.price.toLocaleString()} ₫` : "Liên hệ"}
        </p>
        <p className="product-description">{product.description}</p>
        <p className="product-material">Chất liệu: {product.material}</p>

        {/* Hiển thị các size và số lượng */}
        {renderVariants()}

        {selectedVariant && (
          <p className="variant-quantity-display">
            {" "}
            {/* Thêm class để dễ style nếu cần */}
            Số lượng còn lại: {selectedVariant.quantity}
          </p>
        )}

        {/* Nút thêm vào giỏ hàng */}
        {/* Chỉ hiển thị nút nếu có variants hoặc sản phẩm không cần size */}
        {Array.isArray(product.variants) &&
          product.variants.length > 0 &&
          product.variants[0] !== null && (
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.quantity <= 0} // Disable nếu chưa chọn size hoặc size đã chọn hết hàng
            >
              🛒 Thêm vào giỏ hàng
            </button>
          )}
        {/* Có thể thêm logic cho sản phẩm không có variant ở đây nếu cần */}
        {(!Array.isArray(product.variants) ||
          product.variants.length === 0 ||
          product.variants[0] === null) && (
          <button
            className="add-to-cart-btn"
            onClick={() =>
              dispatch(
                addToCart({ ...product, quantity: 1, cartItemId: product.id })
              )
            } // Xử lý add to cart cho sp không có variant
          >
            🛒 Thêm vào giỏ hàng
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
