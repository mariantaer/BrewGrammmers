import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const user = location.state?.userInfo || JSON.parse(localStorage.getItem("userInfo")) || {};
    const cartItems = location.state?.cart || [];
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    setUserInfo(user);
    setCart(cartItems);
    setOrderDate(formattedDate);

    const timer = setTimeout(() => {
      setShowConfirmation(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.state]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="receipt-empty-container">
        <h3>No order details available.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/order-now")}>
          Go to Order Now
        </button>
      </div>
    );
  }

  return (
    <div
      className="receipt-wrapper"
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {showConfirmation && (
        <div
          className="container text-center"
          style={{
            maxWidth: 600,
            marginBottom: 20,
            padding: "10px 15px",
            backgroundColor: "#f0f8ff",
            borderRadius: 6,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          <p>Thank you for your purchase. We’re preparing your order for delivery.</p>
          <p style={{ fontWeight: "normal", fontSize: "0.9rem", marginTop: 8 }}>
            Your order is being processed and will be shipped within 2-3 business days. Please keep your contact information handy for delivery updates.
          </p>
        </div>
      )}

      {/* White Receipt Container */}
      <div
        className="container"
        style={{
          maxWidth: 600,
          border: "1px solid #ddd",
          padding: 30,
          borderRadius: 8,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-center mb-4">Receipt</h2>

        <section style={{ marginBottom: 20 }}>
          <h5>Order Details</h5>
          <p><strong>Date:</strong> {orderDate}</p>
          <p><strong>Name:</strong> {userInfo.name || "N/A"}</p>
          <p><strong>Username:</strong> {userInfo.username || "N/A"}</p>
          <p><strong>Email:</strong> {userInfo.email || "N/A"}</p>
          <p><strong>Contact Number:</strong> {userInfo.contact_number || userInfo.phone || "N/A"}</p>
          <p><strong>Address:</strong> {userInfo.address || "N/A"}</p>
        </section>

        <section>
          <table className="table">
            <thead>
              <tr style={{ borderBottom: "2px solid #000" }}>
                <th>Item</th>
                <th className="text-end">Price</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ id, name, price, quantity }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td className="text-end">${price.toFixed(2)}</td>
                  <td className="text-center">{quantity}</td>
                  <td className="text-end">${(price * quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #000" }}>
                <td colSpan={3} className="text-end fw-bold">Total:</td>
                <td className="text-end fw-bold">${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </div>

      {/* Button Below White Container */}
      <div style={{ marginTop: 20 }}>
        <button className="btn btn-primary" onClick={() => navigate("/customerdashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Receipt;