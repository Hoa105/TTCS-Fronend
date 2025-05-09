import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
} from "../slices/cartSilce";

const CartPage = () => {
  const { cart, cartTotalAmount } = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQuantity = (item) => {
    console.log("increaseQuantity called with item:", item);
    dispatch(
      addToCart({
        ...item, // Truyền dữ liệu item hiện có
        quantity: 1, // Reducer addToCart sẽ xử lý việc tăng số lượng
      })
    );
  };

  const decreaseQuantity = (id) => {
    dispatch(decreaseCart({ id }));
  };

  const handleremoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleclearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>🛒 Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", marginRight: "20px" }}
              />
              <div>
                <span>{item.name}</span> - <b>{item.price.toLocaleString()}₫</b>
                {item.selectedSize && (
                  <span className="item-size">Size: {item.selectedSize}</span>
                )}
                <span> {item.selectedSize}</span>
                <div className="cart-actions">
                  <button
                    onClick={() => decreaseQuantity(item.cartItemId)}
                    className="reset-button"
                  >
                    -
                  </button>
                  <span> {item.quantity || 1} </span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="reset-button"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleremoveFromCart(item.cartItemId)}
                    className="reset-button"
                  >
                    ❌ Xóa
                  </button>
                  <p>
                    <b>
                      {(item.price * (item.quantity || 1)).toLocaleString()}₫
                    </b>
                  </p>
                </div>
              </div>
            </div>
          ))}
          <h3>Tổng tiền: {cartTotalAmount.toLocaleString()}₫</h3>
          <button onClick={handleclearCart} style={{ marginRight: "10px" }}>
            🗑 Xóa tất cả
          </button>
          <button onClick={handleCheckout}>💳 Thanh toán</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
