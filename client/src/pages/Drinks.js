import React from "react";
import { Link } from "react-router-dom";

const Drinks = () => {
  const products = [
  { id: 7, name: "Hot Chocolate", price: 100.00, image: "/img/hot.jpg", category: "Drinks" },
  { id: 8, name: "Classic Coffee", price: 100.00, image: "/img/coffee.jpg", category: "Drinks" },
  { id: 9, name: "Mocha Latte", price: 215.00, image: "/img/macha.jpg", category: "Drinks" },
  { id: 10, name: "Strawberry Milkshake", price: 190.00, image: "/img/straw.jpg", category: "Drinks" },
  { id: 11, name: "Milk", price: 110.00, image: "/img/milk.jpg", category: "Drinks" },
  { id: 12, name: "Iced Tea", price: 2.00, image: "/img/tea.jpg", category: "Drinks" },
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
          margin: 80px;
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
          padding: 10px 20px;
          width: 215px;
          font-weight: bold;
          border: none;
          background-color: #51504c;
          color: white;
          border-radius: 6px;
          transition: background-color 0.2s ease-in-out;
          display: flex;
          text-align: center;
          margin-left: 505px;
          margin-top: 50px;
        }
        .btn-secondary:hover {
          background-color: #5a6268;
        }
        h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin: 8rem;
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
            Go Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Drinks;