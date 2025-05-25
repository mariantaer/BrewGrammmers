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
        <div className="container">
          <Link className="navbar-brand" to="/">BrewGram</Link>
          <div>
            {!hideHomeButton && (
              <Link className="btn btn-outline-light me-2" to="/">Home</Link>
            )}
          </div>
        </div>
      </nav>

      <style>{`
        .navbar.navbar-expand-lg.navbar-dark.bg-dark {
          background-color: rgb(157, 59, 59);
        }
        .navbar-brand {
          font-weight: bold;
          font-size: 1.5rem;
          font-color:rgb(99, 31, 31);
          padding: 30px;
        }
        .btn-outline-light {
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.3s ease;
          float: right;
        }
        .btn-outline-light:hover {
          background-color:rgb(8, 23, 52);
          color:rgb(255, 255, 255);
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default Navbar;
