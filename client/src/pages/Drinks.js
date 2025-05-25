import React from "react";
import { Link } from "react-router-dom";

const Drinks = () => {
  const products = [
    { id: 7, name: "Hot Chocolate", price: 3.5, image: "/img/hot.jpg" },
    { id: 8, name: "Classic Coffee", price: 4.5, image: "/img/coffee.jpg" },
    { id: 9, name: "Mocha Latte", price: 4.0, image: "/img/macha.jpg" },
    { id: 10, name: "Strawberry Milkshake", price: 5.75, image: "/img/straw.jpg" },
    { id: 11, name: "Milk", price: 2.0, image: "/img/milk.jpg" },
    { id: 12, name: "Iced Tea", price: 2.0, image: "/img/tea.jpg" },
  ];

  return (
    <div>
      {/* Embedded CSS */}
      <style>{`
        body {
          background-image: url('/img/backg.jpg'); /* Adjust to your actual background image path */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        .product-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.2s ease-in-out;
          background-color: white;
          width: 100%;
          max-width: 300px;
        }
        .product-card:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .card-img-top {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }
        .card-title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .card-text {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .card-body {
          padding: 1rem;
          text-align: center;
        }
        .btn-secondary {
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          font-weight: bold;
          border: none;
          background-color: #6c757d;
          color: white;
          border-radius: 6px;
          transition: background-color 0.2s ease-in-out;
          text-decoration: none;
        }
        .btn-secondary:hover {
          background-color: #5a6268;
        }
        h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin: 6rem;
          margin-bottom: 10px;
        }
      `}</style>

      {/* Component Content */}
      <div className="container">
        <h2>Drinks</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/customerdashboard" className="btn-secondary">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Drinks;