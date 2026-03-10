const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/connection");
const { v4: uuidv4 } = require("uuid");
const { Patients } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function patientregister(req, res) {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fullname, username, email, and password are required",
      });
    }

    if (username.length < 4 || password.length < 5) {
      return res.status(400).json({
        success: false,
        message:
          "Username must be at least 4 characters and Password at least 5 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const existingPatient = await Patients.findOne({ where: { email } });
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newPatient = {
      id: uuidv4(),
      fullname,
      username,
      email,
      password: hashedPassword,
    };

    await Patients.create(newPatient);

    const { password: _, ...patientResponse } = newPatient;

    return res.status(201).json({
      success: true,
      data: patientResponse,
      message: "Patient Registered successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function patientlogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const patient = await Patients.findOne({
      where: { email },
      attributes: ["id", "fullname", "username", "email", "password"],
    });
    if (!patient) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

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
      message: "Patient Login successfully",
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  patientregister,
  patientlogin,
};
