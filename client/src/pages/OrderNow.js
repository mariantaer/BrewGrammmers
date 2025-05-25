import React from "react";
import { Link } from "react-router-dom"; // ⬅️ Import Link
import ProductList from "../components/ProductList";
import './ordernow.css';

const OrderNow = ({ addToCart }) => {
  return (
    <div className="container mt-4">
      {/* Go Back to Dashboard Button */}
      <div className="mb-3">
        <Link to="/customerdashboard" className="btn btn-secondary">
          Go Back to Dashboard
        </Link>
      </div>

      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default OrderNow;
