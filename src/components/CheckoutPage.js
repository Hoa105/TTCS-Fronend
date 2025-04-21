import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../slices/productsSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.products.cart);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("VNPAY");

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đơn hàng đã đặt với phương thức thanh toán: ${paymentMethod}`);
    dispatch(setCart([]));
    navigate("/");
  };

  return (
    <div>
      <h1>💳 Thanh toán</h1>
      <h3>Tổng tiền: {getTotalPrice().toLocaleString()}₫</h3>
      <form onSubmit={handleSubmit} className="style">
        <div>
          <label>Họ và tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Địa chỉ giao hàng:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Phương thức thanh toán:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="VNPAY">VNPAY</option>
            <option value="MOMO">MOMO</option>
            <option value="COD">Thanh toán khi nhận hàng</option>
          </select>
        </div>

        <div className="button-container">
          <button type="submit">Xác nhận đơn hàng</button>
          <button type="button" onClick={() => navigate("/cart")}>
            Quay lại giỏ hàng
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
