// src/pages/AdminDashboard.js
import React from "react";
import ProductInventory from "../pages/ProductInventory";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <ProductInventory />
    </div>
  );
};

export default AdminDashboard;
