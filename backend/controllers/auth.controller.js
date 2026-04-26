const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Doctors, Patients } = require("../models");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function unifiedLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 1. Check Admin (Hardcoded for now as per current implementation)
    if (email === "admin@gmail.com" && password === "12345678") {
      const payload = {
        id: "admin-id",
        fullname: "System Admin",
        email: "admin@gmail.com",
        role: "admin",
        time: Date.now(),
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
      return res.status(200).json({
        success: true,
        token,
        user: payload,
        message: "Admin Login successful",
      });
    }

    // 2. Check Doctors
    const doctor = await Doctors.findOne({ where: { email } });
    if (doctor) {
      const isPasswordValid = await bcrypt.compare(password, doctor.password);
      if (isPasswordValid) {
        const payload = {
          id: doctor.id,
          fullname: doctor.fullname,
          email: doctor.email,
          role: "doctor",
          isVerified: doctor.isVerified,
          time: Date.now(),
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
        return res.status(200).json({
          success: true,
          token,
          user: payload,
          message: doctor.isVerified
            ? "Doctor Login successful"
            : "Doctor Login successful. Account pending verification.",
        });
      }
    }

    // 3. Check Patients
    const patient = await Patients.findOne({ where: { email } });
    if (patient) {
      const isPasswordValid = await bcrypt.compare(password, patient.password);
      if (isPasswordValid) {
        const payload = {
          id: patient.id,
          fullname: patient.fullname,
          username: patient.username,
          email: patient.email,
          role: "patient",
          time: Date.now(),
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
        return res.status(200).json({
          success: true,
          token,
          user: payload,
          message: "Patient Login successful",
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Unified Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  unifiedLogin,
};
