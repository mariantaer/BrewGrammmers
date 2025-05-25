import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <style>{`

        .title {
          color: rgb(225, 154, 83);
          margin-bottom: 1rem;
        }

        .quote {
          color: white;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .btn.btn-primary {
          background-color: blue;
          color: white;
          border-radius: 5px;
          padding: 8px 20px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn.btn-primary:hover {
          background-color: rgb(160, 183, 203);
          transform: scale(1.03);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
          .custom-title {
          color: rgb(255, 255, 255);
          font-size: 2.2rem 
        }
          .quote{
          color: rgb(255, 255, 255);
          font-size: ..9rem
          }

      `}</style>

      <div className="home-container">
        <div className="custom-title">
          <h1>BrewGram</h1>
        </div>
        <div className="quote">
          <h2>"Brew.Debug.Repeat"</h2>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
