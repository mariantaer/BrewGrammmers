import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/styles.css";

const products = [
  { id: 1, name: "Banana Bread", price: 5.00, category: "Breads" },
  { id: 2, name: "Baguette", price: 4.00, category: "Breads" },
  { id: 3, name: "Ensaymada", price: 2.50, category: "Breads" },
  { id: 4, name: "Ham and Cheese Bread", price: 8.75, category: "Breads" },
  { id: 5, name: "Fresh Bread", price: 4.00, category: "Breads" },
  { id: 6, name: "Chocolate Brownie", price: 3.50, category: "Breads" },

  { id: 7, name: "Hot Chocolate", price: 3.50, category: "Drinks" },
  { id: 8, name: "Classic Coffee", price: 4.50, category: "Drinks" },
  { id: 9, name: "Mocha Latte", price: 4.00, category: "Drinks" },
  { id: 10, name: "Strawberry Milkshake", price: 5.75, category: "Drinks" },
  { id: 11, name: "Milk", price: 2.00, category: "Drinks" },
  { id: 12, name: "Iced Tea", price: 2.00, category: "Drinks" },

  { id: 13, name: "Mousse Cake", price: 10.00, category: "Desserts" },
  { id: 14, name: "Bibingka", price: 3.00, category: "Desserts" },
  { id: 15, name: "Leche Flan", price: 10.00, category: "Desserts" },
  { id: 16, name: "Ice Cream", price: 8.75, category: "Desserts" },
  { id: 17, name: "Mango Graham", price: 4.00, category: "Desserts" },
  { id: 18, name: "Chocolate Cookie", price: 5.00, category: "Desserts" },
];

const categories = ["Breads", "Drinks", "Desserts"];

const ProductList = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState("Breads");

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pick Your Favorite Delights!</h1>

      <div className="bg-white p-3 mb-4">
        <ul className="nav nav-tabs">
          {categories.map((category, idx) => (
            <li className="nav-item" key={idx}>
              <button
                className={`nav-link ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6">
            <div className="card product-card">
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₱{product.price.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary-btn-container mt-4 d-flex justify-content-center gap-3">
        <Link to="/order-summary">
          <button className="btn btn-warning order-summary-btn">Cart</button>
        </Link>

        <Link to="/dashboard">
          <button className="dashboard-btn">Go Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
