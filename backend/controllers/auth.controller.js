const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const sendWelcomeEmail = require("../utils/sendMail");

const USERS_FILE = "users.json";
const JWT_SECRET = process.env.JWT_SECRET;

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return JSON.parse(data || "[]");
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

async function patientregister(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (name.length < 4 || password.length < 5) {
    return res.status(400).json({
      success: false,
      message:
        "Name must be at least 4 characters and Password at least 5 characters",
    });
  }

  let users = loadUsers();

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists. Please login instead.",
    });
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: role,
  };

  users.push(newUser);
  saveUsers(users);

  sendWelcomeEmail(name, email)
  .then(() => console.log(`✅ Welcome email sent to ${email}`))
  .catch((err) => console.error("❌ Failed to send welcome email:", err));

  return res.status(201).json({
    success: true,
    data: newUser,
    message: "Patient Registered successfully. Check your email for a welcome message!",
  });
}

function patientlogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  let users = loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    time: Date.now(),
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });

  return res.status(200).json({
    success: true,
    token,
    user: payload,
    message: "Patient Login successfully",
  });
}

module.exports = { patientregister, patientlogin };
