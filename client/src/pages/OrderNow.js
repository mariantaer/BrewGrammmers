import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import './ordernow.css';

const OrderNow = ({ addToCart }) => {
  return (
    <div className="container mt-4">
      {/* Assuming ProductList handles rendering the products as cards */}
      <ProductList addToCart={addToCart} />

      <div className="goto mt-4 mb-3">
        <Link to="/customerdashboard" className="btn btn-secondary">
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default OrderNow;
