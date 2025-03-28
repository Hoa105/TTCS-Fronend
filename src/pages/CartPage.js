import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const CartPage = () => {
  const { cart, setCart } = useContext(ProductContext);

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    ));
  };

  // Hàm giảm số lượng (không cho nhỏ hơn 1)
  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Hàm xóa một sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Tính tổng tiền
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <div>
      <h1>🛒 Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <img src={item.image} alt={item.name} style={{ width: "50px", marginRight: "10px" }} />
              <span>{item.name}</span> - <b>{item.price}₫</b>
              <div>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span> {item.quantity || 1} </span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </div>
            </div>
          ))}
          <h3>Tổng tiền: {getTotalPrice()}₫</h3>
          <button onClick={clearCart} style={{ marginRight: "10px" }}>🗑 Xóa tất cả</button>
          <button>💳 Thanh toán</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
