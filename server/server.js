require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database Connected!");
  }
});

// LOGIN Route
app.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required!" });
  }

  username = username.trim().toLowerCase();
  const isAdmin = username.endsWith("@brewgram.com");
  const table = isAdmin ? "admin" : "users";

  db.query(`SELECT * FROM ${table} WHERE username = ?`, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const updateSql = `UPDATE ${table} SET last_login = NOW() WHERE id = ?`;
    db.query(updateSql, [user.id], (updateErr) => {
      if (updateErr) console.error("Error updating last_login:", updateErr);
    });

    const token = jwt.sign(
      { id: user.id, role: isAdmin ? "admin" : "user" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful!",
      token,
      id: user.id,
      fullname: user.fullname || user.username,
      username: user.username,
      role: isAdmin ? "admin" : "user",
    });
  });
});

// SIGNUP Route for users and admins
app.post("/signup", (req, res) => {
  let { name, username, password, contact_number, address } = req.body;

  if (!name || !username || !password || !contact_number || !address) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  name = name.trim();
  username = username.trim().toLowerCase();
  password = password.trim();
  contact_number = contact_number.trim();
  address = address.trim();

  const isAdmin = username.endsWith("@brewgram.com");
  const table = isAdmin ? "admin" : "users";

  if (!["admin", "users"].includes(table)) {
    return res.status(400).json({ error: "Invalid user type." });
  }

  db.query(`SELECT * FROM ${table} WHERE username = ?`, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error!" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Username is already registered!" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Hashing error:", err);
        return res.status(500).json({ error: "Error hashing password" });
      }

      const sql = `
        INSERT INTO ${table} (name, username, password, contact_number, address, role, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `;
      const role = isAdmin ? "admin" : "customer";
      db.query(sql, [name, username, hashedPassword, contact_number, address, role], (err, result) => {
        if (err) {
          console.error("Insert user error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(201).json({
          message: `${isAdmin ? "Admin" : "User"} signed up successfully!`,
          userId: result.insertId,
        });
      });

      // SAVE USER INFO (additional details)
app.post('/information', async (req, res) => {
  const { name, contact_number, delivery_address } = req.body;

  if (!name || !contact_number || !delivery_address) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const createdAt = new Date();

  try {
    const [result] = await db.execute(
      'INSERT INTO information (name, contact_number, address, created_at) VALUES (?, ?, ?, ?)',
      [name, contact_number, delivery_address, createdAt]
    );

    const userId = result.insertId;
    res.status(201).json({ message: 'User saved successfully.', userId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to save user info.' });
  }
});

});
});
});

// ORDER SUMMARY (overall + details)
app.post('/api/orders', (req, res) => {
  const { userId, products, totalAmount } = req.body;

  if (!userId || !products || !Array.isArray(products) || !totalAmount) {
    return res.status(400).json({ error: "Missing or invalid order data" });
  }

  // Step 1: Insert into orders table
  const orderSql = `INSERT INTO orders (user_id, total_amount, created_at) VALUES (?, ?, NOW())`;

  db.query(orderSql, [userId, totalAmount], (err, orderResult) => {
    if (err) {
      console.error("❌ Error inserting into orders:", err);
      return res.status(500).json({ error: "Database error saving order summary" });
    }

    const orderId = orderResult.insertId;

    // Step 2: Insert into order_items table
    const orderItems = products.map((p) => [
      orderId,
      p.name,
      p.quantity,
      p.price * p.quantity,
      "Pending"
    ]);

    const itemsSql = `
      INSERT INTO order_items (order_id, product_name, quantity, subtotal, status)
      VALUES ?
    `;

    db.query(itemsSql, [orderItems], (err2) => {
      if (err2) {
        console.error("❌ Error inserting order items:", err2);
        return res.status(500).json({ error: "Database error saving order items" });
      }

      res.status(200).json({
        message: "✅ Order placed successfully",
        orderId,
      });
    });
  });
});

// PRODUCT Routes
// ✅ Get all products
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM productinventory", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get product by ID
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM productinventory WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json(result[0]);
  });
});

// ✅ Add a new product
app.post("/api/products", (req, res) => {
  const { name, qty, price, category } = req.body;
  const sql = "INSERT INTO productinventory (name, qty, price, category) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, qty, price, category], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, qty, price, category });
  });
});

// ✅ Update a product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, qty, price, category } = req.body;
  const sql = "UPDATE productinventory SET name = ?, qty = ?, price = ?, category = ? WHERE id = ?";
  db.query(sql, [name, qty, price, category, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, name, qty, price, category });
  });
});

// ✅ Delete a product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM productinventory WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
});

app.get("/productinventory", (req, res) => {
  db.query("SELECT * FROM productinventory", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
