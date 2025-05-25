import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {
    name: "Guest",
    phone: "N/A",
    address: "N/A",
  };

  const handleDelete = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleReduceQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/receipt", {
          state: {
            cart,
            totalAmount: totalPrice,
            orderId: data.orderId,
          },
        });
      } else {
        alert("Failed to save order.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred during checkout.");
    }
  };

  const handleBack = () => {
    navigate("/ordernow");
  };

  return (
    <div
      className="order-summary-wrapper"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="order-summary-container"
        style={{
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-center">Order Summary</h2>

        <div className="mb-4">
          <h5>Customer Info:</h5>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <p><strong>Address:</strong> {userInfo.address}</p>
        </div>

        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="order-summary bg-light p-3 rounded">
              <table className="table" style={{ width: "100%", marginBottom: 20 }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>SubTotal</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleReduceQuantity(item.id)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 className="text-center">Total: ${totalPrice.toFixed(2)}</h4>
            </div>
          </>
        )}
      </div>

      {/* Buttons below white container */}
      {cart.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <button className="btn btn-success me-2" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;