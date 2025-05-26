import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  { id: 1, name: "Banana Bread", qty: 10, price: 150.00, category: "Breads" },
  { id: 2, name: "Baguette", qty: 5, price: 200.00, category: "Breads" },
  { id: 3, name: "Ensaymada", qty: 8, price: 95.00, category: "Breads" },
  { id: 4, name: "Ham and Cheese Bread", qty: 89.75, price: 8.75, category: "Breads" },
  { id: 5, name: "Fresh Bread", qty: 7, price: 90.00, category: "Breads" },
  { id: 6, name: "Chocolate Brownie", qty: 9, price: 95.00, category: "Breads" },
  { id: 7, name: "Hot Chocolate", qty: 12, price: 3.5, category: "Drinks" },
  { id: 8, name: "Classic Coffee", qty: 14, price: 100.00, category: "Drinks" },
  { id: 9, name: "Mocha Latte", qty: 10, price: 215.00, category: "Drinks" },
  { id: 10, name: "Strawberry Milkshake", qty: 6, price: 190.00, category: "Drinks" },
  { id: 11, name: "Milk", qty: 10, price: 110.00, category: "Drinks" },
  { id: 12, name: "Iced Tea", qty: 15, price: 95.00, category: "Drinks" },
  { id: 13, name: "Mousse Cake", qty: 4, price: 250.00, category: "Desserts" },
  { id: 14, name: "Bibingka", qty: 5, price: 100.00, category: "Desserts" },
  { id: 15, name: "Leche Flan", qty: 6, price: 120.00, category: "Desserts" },
  { id: 16, name: "Ice Cream", qty: 8, price: 100.00, category: "Desserts" },
  { id: 17, name: "Mango Graham", qty: 7, price: 150.00, category: "Desserts" },
  { id: 18, name: "Chocolate Cookie", qty: 9, price: 100.00, category: "Desserts" },
];

export default function ProductInventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(
    initialProducts.filter((p) => p.price !== undefined && p.price !== null)
  );
  const [form, setForm] = useState({
    id: null,
    name: "",
    qty: "",
    price: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const displayProduct =
    form.id !== null
      ? {
          id: form.id,
          name: form.name,
          qty: form.qty,
          price: form.price,
          category: form.category,
        }
      : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.name || !form.qty || !form.price || !form.category) {
      alert("Please fill all fields!");
      return;
    }
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name: form.name,
      qty: parseInt(form.qty),
      price: parseFloat(form.price),
      category: form.category,
    };
    setProducts((prev) => [...prev, newProduct]);
    setForm({ id: null, name: "", qty: "", price: "", category: "" });
  };

  const handleDelete = (id) => {
    const deletedProduct = products.find((p) => p.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${deletedProduct.name}"?`
    );

    if (!confirmDelete) return;

    setProducts(products.filter((p) => p.id !== id));
    setSuccessMessage(`Product "${deletedProduct.name}" Deleted successfully ❌`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      qty: product.qty,
      price: product.price,
      category: product.category,
    });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!form.name || !form.qty || !form.price || !form.category) {
      alert("Please fill all fields!");
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === form.id
          ? {
              ...p,
              name: form.name,
              qty: parseInt(form.qty),
              price: parseFloat(form.price),
              category: form.category,
            }
          : p
      )
    );

    setForm({ id: null, name: "", qty: "", price: "", category: "" });
    setIsEditing(false);

    setSuccessMessage("Product updated successfully ✅");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setForm({ id: null, name: "", qty: "", price: "", category: "" });
    setIsEditing(false);
  };

  return (
    <>
      <div
        style={{
          maxWidth: 700,
          margin: "20px auto",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Product Inventory</h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              textAlign: "center",
              border: "1px solid #c3e6cb",
            }}
          >
            {successMessage}
          </div>
        )}

        {displayProduct && (
          <div
            style={{
              marginBottom: 20,
              padding: 10,
              backgroundColor: "#f9f9f9",
              borderRadius: 6,
              fontSize: 14,
              color: "#333",
              textAlign: "center",
              border: "1px solid #ddd",
            }}
          >
            <div>id: {displayProduct.id}</div>
            <div>name: {displayProduct.name}</div>
            <div>qty: {displayProduct.qty}</div>
            <div>price: ₱{parseFloat(displayProduct.price).toFixed(2)}</div>
            <div>category: {displayProduct.category}</div>
          </div>
        )}

        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: 16,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={form.qty}
            onChange={handleChange}
            min="0"
          />
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            min="0"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          {isEditing ? (
            <div>
              <button onClick={handleUpdate} style={{ marginRight: 8 }}>
                Update Product
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleAdd}>Add Product</button>
          )}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
              <th style={{ textAlign: "center", padding: "8px" }}>Qty</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Price (₱)</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Category</th>
              <th style={{ padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No products available.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{product.name}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{product.qty}</td>
                <td style={{ padding: "8px", textAlign: "right" }}>
                  ₱{product.price.toFixed(2)}
                </td>
                <td style={{ padding: "8px" }}>{product.category}</td>
                <td style={{ padding: "8px" }}>
                  <button onClick={() => handleEdit(product)} style={{ marginRight: 8 }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Home Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: isHovered ? "#1f2ebf" : "#3648e4",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#ffffff",
              transition: "background-color 0.3s ease",
            }}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
}
