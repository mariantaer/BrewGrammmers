import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles.css"; // Keep this if you have global styles

const CustomerDashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">See Our Product</h1>

      <div className="row justify-content-center gap-4 mb-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/breads" className="text-decoration-none">
            <div className="product-card">
              <img
                src="/img/Ensaymada.jpg"
                className="product-img"
                alt="Breads"
              />
              <div className="product-body">
                <h5 className="product-title">Breads</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/drinks" className="text-decoration-none">
            <div className="product-card">
              <img
                src="/img/coffee.jpg"
                className="product-img"
                alt="Drinks"
              />
              <div className="product-body">
                <h5 className="product-title">Drinks</h5>              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/desserts" className="text-decoration-none">
            <div className="product-card">
              <img
                src="/img/cream.jpg"
                className="product-img"
                alt="Desserts"
              />
              <div className="product-body">
                <h5 className="product-title">Desserts</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
  <div className="mt-4 mb-5">
    <Link to="/ordernow" className="btn btn-dark">
      Order Now
    </Link>
  </div>
</div>


      {/* CSS */}
      <style>{`

        .mt-5{
        padding:150px;
        font-size: 1rem;
        text-center;
        }

        .product-card {
          display: flex;                 /* Required for flex properties to work */
          flex-direction: column;
          align-items: center; 
          justify-content: center;
          background-color: #f0f0ff;
          padding: 10px;
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .col-12.col-sm-6.col-md-4.col-lg-3 {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .product-card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        .product-img {
          height: 50px;
          object-fit: cover;
          border-radius: 10px;
          
        }

        .product-body {
          padding-top: 60px;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: -40px;
        }

        .product-price {
          font-size: 1rem;
          margin-top: 10px;
        }

        .btn.btn-dark {
          background-color: blue;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          font-weight: 500;
          transition: background-color 0.3s ease;
          text-align: center;
        }

        .centercontainer {
          display: flex;
          justify-content: center; /* horizontal centering */
          align-items: center;     /* vertical centering */
          height: 100vh;           /* full viewport height */
        }

        .btn.btn-secondary {
          background-color: gray;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          font-weight: 500;
          transition: background-color 0.3s ease;
}

.btn.btn-secondary:hover {
  background-color: darkgray;
}

      `}</style>
    </div>
  );
};

export default CustomerDashboard;