import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import OrderNow from "./pages/OrderNow";
import OrderSummary from "./components/OrderSummary";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import DisplayOrders from "./pages/DisplayOrders";
import ConfirmPage from "./pages/ConfirmPage";
import Breads from "./pages/Breads";
import Drinks from "./pages/Drinks";
import Desserts from "./pages/Desserts";
import Receipt from "./pages/Receipt";
import ProductInventory from "./pages/ProductInventory";
import AdminDashboard from "./pages/AdminDashboard";


const AppWrapper = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.name === product.name);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart[index].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Conditionally hide NavBar on login page
  const hideNavBar = location.pathname === "/login";

  return (
    <>
      {!hideNavBar && <NavBar cart={cart} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/ordernow" element={<OrderNow addToCart={addToCart} setCart={setCart} />} />
        <Route path="/order-summary" element={<OrderSummary cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/displayorders" element={<DisplayOrders />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/breads" element={<Breads />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/desserts" element={<Desserts />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/admin/productinventory" element={<ProductInventory />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
