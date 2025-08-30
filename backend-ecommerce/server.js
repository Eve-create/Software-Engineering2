import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});

const salt = 5;

app.post("/register", (req, res) => {
  const sql = "INSERT INTO user (`username`, `email`, `password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json("Error");
    const values = [req.body.username, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.json("Database Error");
      } else {
        return res.json(result);
      }
    });
  });
});

// Login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE `email` = ?";
  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Error: "Error" });
    else {
      if (result.length > 0) {
        bcrypt.compare(
          req.body.password.toString(),
          result[0].password,
          (err, response) => {
            if (err) return res.json({ Error: "Error" });
            if (response) return res.json({ Status: "Success" });
            else return res.json({ Error: "Wrong password" });
          }
        );
      } else {
        return res.json({ Error: "Email not found." });
      }
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store files in /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage: storage });

// Add product (with image upload)
app.post("/products", upload.single("image"), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO productList (`name`, `description`, `price`, `image`) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, description, price, image], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding product" });
    }
    res.json({ message: "✅ Product added successfully!" });
  });
});

// Get all products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM productList";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error fetching products" });
    return res.json(result);
  });
});

// Search products by name
app.get("/search", (req, res) => {
  const search = req.query.q;
  const sql = "SELECT * FROM productList WHERE name LIKE ?";
  db.query(sql, [`%${search}%`], (err, result) => {
    if (err) return res.json({ Error: "Error searching products" });
    return res.json(result);
  });
});

app.post("/donation", (req, res) => {
  const { first_name, last_name, amount, payment_method, number } = req.body;
  const sql = `
    INSERT INTO donation 
    (first_name, last_name, amount, payment_method, number, date) 
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  db.query(
    sql,
    [first_name, last_name, amount, payment_method, number],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting donation:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "✅ Donation recorded successfully!" });
    }
  );
});

// Fetch all donations (for DonationHistory.js)
app.get("/donation", (req, res) => {
  const sql = "SELECT * FROM donation ORDER BY date DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error fetching donations:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.listen(8081, () => {
  console.log("🚀 Server listening on port 8081");
});
