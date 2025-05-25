import React from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import useNavigate
import ProductList from "../components/ProductList";
import './ordernow.css';

const OrderNow = ({ addToCart }) => {
  const navigate = useNavigate(); // ⬅️ Initialize

  const handleGoBack = () => {
    navigate("/customerdashboard"); // ⬅️ Direct to CustomerDashboard
  };

  return (
    <div className="container mt-4">
      {/* Go Back to Dashboard Button */}
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={handleGoBack}>
          Go Back to Dashboard
        </button>
      </div>

      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default OrderNow;
