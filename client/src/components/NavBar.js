import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../App.css';

const Navbar = ({ cart }) => {
  const location = useLocation();

  // Hide Home button if currently on Home page
  const hideHomeButton = location.pathname === "/";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navcontainer">
          <Link className="navbar-brand" to="/" style={{ color: '#ffffff' }}> BrewGram</Link>
          <div>
            {!hideHomeButton && (
              <Link className="btn btn-outline-light me-2" to="/" style={{ color: '#ffffff' }}>Home</Link>
            )}
          </div>
        </div>
      </nav>

      <style>{`
        .navcontainer{
        background-color: #1E1F22;
        padding: 20px;
        }
        .navbar.navbar-expand-lg.navbar-dark.bg-dark {
          background-color: rgb(253, 253, 253);
        }
        .navbar-brand {
          font-weight: bold;
          font-size: 1.5rem;
          font-color:rgb(99, 31, 31);
          padding: 30px;
        }
        .btn.btn-outline-light.me-2{
          font-weight: bold;
          font-size: 1rem;
          font-color:rgb(99, 31, 31);
          padding-right: 30px;
          margin-top: -25px;
        }
        .btn-outline-light {
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.3s ease;
          float: right;
          padding: 10px 20px;
          width: 86px;
          border: 10px;
          border: 1px solid #ffffff; /* Corrected */
          background-color: #1E1F22;
          margin-right: 20px;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .btn-outline-light:hover {
          background-color:rgb(81, 81, 82);
          color:rgb(255, 255, 255);
          transform: scale(1.05);
          padding: 10px 20px;        
        }
      `}</style>
    </>
  );
};

export default Navbar;
