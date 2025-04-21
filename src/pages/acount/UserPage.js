// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const UserPage = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   if (!user) {
//     return <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>;
//   }

//   return (
//     <div className="form">
//       <form>
//         <fieldset>
//           <legend>Thông tin tài khoản:</legend>
//           <p>
//             <strong>Họ tên:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Tên đăng nhập:</strong> {user.username}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>Số điện thoại:</strong> {user.phone}
//           </p>
//           <p>
//             <strong>Địa chỉ:</strong> {user.address}
//           </p>
//           <div className="button-container">
//             <button onClick={() => navigate("/acount/change-user")}>
//               Sửa thông tin
//             </button>
//             <button onClick={handleLogout}>Đăng xuất</button>
//             <Link to="/acount/change-password">Đổi mật khẩu</Link>
//           </div>
//         </fieldset>
//         <fieldset>
//           <legend>Theo dõi đơn hàng</legend>
//         </fieldset>
//       </form>
//     </div>
//   );
// };

// export default UserPage;
import React, { useState, useEffect } from "react";
import "../../assets/css/Acount.css";
import { useNavigate, Link } from "react-router-dom";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // Giả lập danh sách đơn hàng (bạn thay API nếu có backend)
    const fakeOrders = [
      {
        id: "DH001",
        date: "20/04/2025",
        status: "Đang xử lý",
        total: "2.000.000đ",
      },
      {
        id: "DH002",
        date: "18/04/2025",
        status: "Đã giao",
        total: "1.500.000đ",
      },
    ];
    setOrders(fakeOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  if (!user) {
    return <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>;
  }

  return (
    <div className="account-container">
      <div className="tab-header">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          Thông tin tài khoản
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Đơn hàng của tôi
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "info" && (
          <div className="info-tab">
            <p>
              <strong>Họ tên:</strong> {user.name}
            </p>
            <p>
              <strong>Tên đăng nhập:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {user.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {user.address}
            </p>

            <div className="button-container">
              <button onClick={() => navigate("/acount/change-user")}>
                Sửa thông tin
              </button>

              <button onClick={handleLogout}>Đăng xuất</button>
              <Link to="/acount/change-password">Đổi mật khẩu</Link>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-tab">
            {orders.length === 0 ? (
              <p>Bạn chưa có đơn hàng nào.</p>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.status}</td>
                      <td>{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
