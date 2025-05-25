import React from "react";
import { Link } from "react-router-dom";

const Desserts = () => {
  const products = [
    { id: 13, name: "Mousse Cake", price: 10.0, image: "/img/cake.jpg" },
    { id: 14, name: "Bibingka", price: 3.0, image: "/img/bibingka.jpg" },
    { id: 15, name: "Leche Flan", price: 10.0, image: "/img/Leche Flan.jpg" },
    { id: 16, name: "Ice Cream", price: 8.75, image: "/img/cream.jpg" },
    { id: 17, name: "Mango Graham", price: 4.0, image: "/img/graham.jpg" },
    { id: 18, name: "Chocolate Cookie", price: 5.0, image: "/img/cookie.jpg" },
  ];

  return (
    <div>
      {/* Embedded Styles */}
      <style>{`
        body {
          background-image: url('/img/backg.jpg'); /* Adjust path to your actual background image */
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
          padding: 0.5rem 1.5rem;
          font-weight: bold;
          border: none;
          background-color: #6c757d;
          color: white;
          border-radius: 6px;
          transition: background-color 0.2s ease-in-out;
          text-decoration: none;
          text-align: center;
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
        <h2>Desserts</h2>
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
            ← Go Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Desserts;