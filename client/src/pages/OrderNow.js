import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import './ordernow.css';

const OrderNow = ({ addToCart }) => {
  return (
    <div className="container mt-4">
      <h2>Order Now</h2>
      {/* Assuming ProductList handles rendering the products as cards */}
      <ProductList addToCart={addToCart} />

      <div className="text-center mt-4">
        <Link to="/customerdashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default OrderNow;
