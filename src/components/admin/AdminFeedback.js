import React, { useEffect, useState } from "react";
import "../../assets/css/AdminFeedback.css";

const AdminFeedback = () => {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8081/messages");
      const data = await res.json();
      setConversations(data.results || []);
    };
    fetchData();
  }, []);

  const handleSelect = async (conv) => {
    const res = await fetch(`http://localhost:8081/messages/${conv.user_id}`);
    const data = await res.json();
    setSelected({
      ...conv,
      messages: data.results || [],
    });
  };

  const handleReply = async () => {
    await fetch("http://localhost:8081/messages/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: selected.user_id, content: reply }),
    });
    setReply("");
    handleSelect(selected);
  };

  return (
    <div className="admin-feedback-container">
      <div className="admin-feedback-sidebar">
        <h3>Khách hàng</h3>
        <ul>
          {[
            ...new Map(
              conversations.map((item) => [item.user_id, item])
            ).values(),
          ].map((conv, idx) => (
            <li
              key={conv.user_id}
              className={
                selected && selected.user_id === conv.user_id
                  ? "admin-feedback-user selected"
                  : "admin-feedback-user"
              }
              onClick={() => handleSelect(conv)}
            >
              {conv.customer_name || "Khách"} ({conv.user_id})
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-feedback-main">
        {selected ? (
          <>
            <h4>Lịch sử chat</h4>
            <div className="admin-feedback-history">
              {(selected.messages || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.is_admin_reply
                      ? "admin-feedback-msg admin"
                      : "admin-feedback-msg user"
                  }
                >
                  <span className="admin-feedback-msg-content">
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Nhập phản hồi..."
              className="admin-feedback-input"
            />
            <button className="admin-feedback-btn" onClick={handleReply}>
              Gửi phản hồi
            </button>
          </>
        ) : (
          <p>Chọn khách hàng để xem chi tiết.</p>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
