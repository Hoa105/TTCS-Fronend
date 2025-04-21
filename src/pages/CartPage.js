import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../slices/productsSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    dispatch(setCart(newCart));
  };

  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
      .filter((item) => item.quantity > 0); // tự động xóa nếu = 0
    dispatch(setCart(newCart));
  };

  const removeFromCart = (id) => {
    dispatch(setCart(cart.filter((item) => item.id !== id)));
  };

  const clearCart = () => {
    dispatch(setCart([]));
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
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
                <div className="cart-actions">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="reset-button"
                  >
                    -
                  </button>
                  <span> {item.quantity || 1} </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="reset-button"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="reset-button"
                  >
                    ❌ Xóa tất cả
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
          <h3>Tổng tiền: {getTotalPrice().toLocaleString()}₫</h3>
          <button onClick={clearCart} style={{ marginRight: "10px" }}>
            🗑 Xóa tất cả
          </button>
          <button onClick={() => (window.location.href = "/checkout")}>
            💳 Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
