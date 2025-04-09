const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const sequelize = require("./database");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Test Database Connection
sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL Connected..."))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Define User Model
const { DataTypes } = require("sequelize");
const User = sequelize.define("User", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false }
});

// Sync Database
sequelize.sync().then(() => console.log("✅ Models Synchronized!"));

// **SIGNUP ENDPOINT**
app.post("/api/v1/users/signup", async (req, res) => {
  const { firstName, lastName, email, username, password, country } = req.body;

  if (!firstName || !lastName || !email || !username || !password || !country) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, email, username, password: hashedPassword, country });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// **LOGIN ENDPOINT**
app.post("/api/v1/users/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "Email/Username and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email: emailOrUsername } }) || await User.findOne({ where: { username: emailOrUsername } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// **TEST SERVER**
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
