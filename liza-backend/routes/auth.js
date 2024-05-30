const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a fixed admin user if not already registered
const registerAdmin = async () => {
  const username = "admin";
  const password = "adminpassword";
  const user = await User.findOne({ username });
  if (!user) {
    const newUser = new User({ username, password });
    await newUser.save();
    console.log("Admin user registered");
  } else {
    console.log("Admin user already exists");
  }
};

registerAdmin();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
