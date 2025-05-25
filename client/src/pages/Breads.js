import React from "react";
import { Link } from "react-router-dom";

const Breads = () => {
  const products = [
    { id: 1, name: "Banana Bread", price: 5.0, image: "/img/Banana Bread.jpg" },
    { id: 2, name: "Baguette", price: 4.0, image: "/img/bagguette.jpg" },
    { id: 3, name: "Ensaymada", price: 2.5, image: "/img/Ensaymada.jpg" },
    { id: 4, name: "Ham and Cheese Bread", price: 8.75, image: "/img/cheese.jpg" },
    { id: 5, name: "Fresh Bread", price: 4.0, image: "/img/tasty.jpg" },
    { id: 6, name: "Chocolate Brownie", price: 3.5, image: "/img/Chocolate Brownie.jpg" },
  ];

  return (
    <div>
      {/* Embedded CSS */}
      <style>{`
        body {
          background-image: url('/img/backg.jpg'); /* Replace with your actual background path */
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
          margin-bottom: 1rem;
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
        <h2>Breads</h2>
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
          <Link to="/customerdashboard" className="btn-secondary">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Breads;