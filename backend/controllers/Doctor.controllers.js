const fs = require("fs");
const bcrypt = require("bcrypt");

const users = [];
const USERS_FILE = "users.json";

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

function doctorregister(req, res) {
  const { name, email, password, role, medicalLicenseNumber, specialty, yearsOfExperience, } = req.body;

  if ( !name || !email || !password || !role || !medicalLicenseNumber || !specialty || !yearsOfExperience ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required, Doctors must provide license number, experience, and specialty",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
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

  if (name.length < 4 || password.length < 5) {
    return res.status(400).json({
      success: false,
      message:
        "Name must be at least 4 characters and Password at least 5 characters",
    });
  }


  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newDoctor = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    medicalLicenseNumber,
    specialty,
    yearsOfExperience,
    role: role,
  };

  users.push(newDoctor);
  saveUsers(users);

  return res.status(201).json({
    success: true,
    data: newDoctor,
    message: "Doctor Registered successfully",
  });
}

function doctorlogin(req, res) {
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

  const token = btoa(JSON.stringify(payload));

  return res.status(200).json({
    success: true,
    token,
    message: "Doctor Login successfully",
  });
}

module.exports = { doctorregister, doctorlogin };
