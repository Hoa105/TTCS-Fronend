import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItems } from "../slices/cartSilce";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadUserCart = (userId) => {
    const guestCartKey = "cart_guest";
    const userCartKey = `cart_${userId}`;

    // Get user's saved cart (if any)
    const userCartData = localStorage.getItem(userCartKey);
    // const userCart = userCartData ? JSON.parse(userCartData) : [];

    let finalCart = [];

    if (userCartData) {
      try {
        finalCart = JSON.parse(userCartData);
        console.log("Loading saved user cart:", finalCart);
      } catch (err) {
        console.error("Error parsing user cart from localStorage:", err);
        // Nếu lỗi parse, coi như giỏ hàng trống
        finalCart = [];
      }
    } else {
      // Nếu không có dữ liệu giỏ hàng của user, vẫn giữ giỏ hàng trống
      console.log("No saved cart found for user. Initializing empty cart.");
    }

    dispatch(setCartItems(finalCart));
    localStorage.removeItem(guestCartKey);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Đăng nhập thất bại. Kiểm tra lại thông tin đăng nhập."
        );
      }

      // Xử lý phản hồi từ API khi đăng nhập thành công
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      loadUserCart(data.user.id);

      toast.success("Đăng nhập thành công!");
      if (data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Đăng nhập</h2>

      <form onSubmit={handleLogin} className="style">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <button type="button" onClick={() => navigate("/register")}>
            Đăng ký
          </button>
        </div>
        <div>
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
