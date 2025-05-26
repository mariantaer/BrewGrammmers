import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/ordernow.css";

const products = [
  { id: 1, name: "Banana Bread", price: 150.00, image: "/img/Banana Bread.jpg", category: "Breads" },
  { id: 2, name: "Baguette", price: 200.00, image: "/img/bagguette.jpg", category: "Breads" },
  { id: 3, name: "Ensaymada", price: 95.50, image: "/img/Ensaymada.jpg", category: "Breads" },
  { id: 4, name: "Ham and Cheese Bread", price: 89.75, image: "/img/cheese.jpg", category: "Breads" },
  { id: 5, name: "Fresh Bread", price: 90.00, image: "/img/tasty.jpg", category: "Breads" },
  { id: 6, name: "Chocolate Brownie", price: 95.50, image: "/img/Chocolate Brownie.jpg", category: "Breads" },

  { id: 7, name: "Hot Chocolate", price: 100.00, image: "/img/hot.jpg", category: "Drinks" },
  { id: 8, name: "Classic Coffee", price: 100.00, image: "/img/coffee.jpg", category: "Drinks" },
  { id: 9, name: "Mocha Latte", price: 215.00, image: "/img/macha.jpg", category: "Drinks" },
  { id: 10, name: "Strawberry Milkshake", price: 190.00, image: "/img/straw.jpg", category: "Drinks" },
  { id: 11, name: "Milk", price: 110.00, image: "/img/milk.jpg", category: "Drinks" },
  { id: 12, name: "Iced Tea", price: 95.00, image: "/img/tea.jpg", category: "Drinks" },

  { id: 13, name: "Mousse Cake", price: 250.00, image: "/img/cake.jpg", category: "Desserts" },
  { id: 14, name: "Bibingka", price: 100.00, image: "/img/bibingka.jpg", category: "Desserts" },
  { id: 15, name: "Leche Flan", price: 120.00, image: "/img/Leche Flan.jpg", category: "Desserts" },
  { id: 16, name: "Ice Cream", price: 100.00, image: "/img/cream.jpg", category: "Desserts" },
  { id: 17, name: "Mango Graham", price: 150.00, image: "/img/graham.jpg", category: "Desserts" },
  { id: 18, name: "Chocolate Cookie", price: 100.00, image: "/img/cookie.jpg", category: "Desserts" },
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
              <img src={product.image} className="card-img-top" alt={product.name} />
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

      <div className="d-flex align-items-center justify-content-start gap-3 mt-4">
        <Link to="/order-summary">
          <button className="btn btn-warning order-summary-btn">Cart</button>
        </Link>

      </div>
    </div>
  );
};

export default ProductList;