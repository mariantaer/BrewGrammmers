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

});
});
});

// ORDER SUMMARY (overall + details)
app.post("/orders", (req, res) => {
  const { cart, totalAmount } = req.body;
  const createdAt = new Date();

  const values = cart.map((item) => [
    item.name,
    item.quantity,
    item.price * item.quantity,
    totalAmount,
    createdAt,
  ]);

  const sql = `
    INSERT INTO orders (product_name, quantity, sub_total, total_amount, created_at)
    VALUES ?
  `;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Error saving order" });
    }

    res.status(201).json({ message: "Order saved", orderId: result.insertId });
  });
});


// PRODUCT Routes
// CREATE product
app.post('/products', (req, res) => {
  const { name, qty, price, category } = req.body;
  const sql = 'INSERT INTO productinventory (name, qty, price, category) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, qty, price, category], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Product created', id: result.insertId });
  });
});

// READ all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM productinventory', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// READ single product by ID
app.get('/products/:id', (req, res) => {
  const sql = 'SELECT * FROM productinventory WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });
});

// UPDATE product
app.put('/products/:id', (req, res) => {
  const { name, qty, price, category } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE productinventory
    SET name = ?, qty = ?, price = ?, category = ?
    WHERE id = ?
  `;

  db.query(sql, [name, qty, price, category, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).send(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.send({ message: 'Product updated successfully' });
  });
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  const sql = 'DELETE FROM productinventory WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Product deleted' });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
