const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/connection");
const { v4: uuidv4 } = require("uuid");
const { Doctors } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  try {
    const {
      fullname,
      medicallicensenumber,
      email,
      password,
      specialization,
      yearsofexperience,
      bio,
      consultationfee,
    } = req.body;

    if (
      !fullname ||
      !medicallicensenumber ||
      !email ||
      !password ||
      !specialization
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Fullname, medical license number, email, password, and specialization are required",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters",
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

    const existingDoctor = await Doctors.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newDoctor = {
      id: uuidv4(),
      fullname,
      medicallicensenumber,
      email,
      password: hashedPassword,
      specialization,
      yearsofexperience: yearsofexperience || 0,
      bio: bio || "",
      consultationfee: consultationfee || 0,
    };

    await Doctors.create(newDoctor);

    // Don't return password in response
    const { password: _, ...doctorResponse } = newDoctor;

    return res.status(201).json({
      success: true,
      data: doctorResponse,
      message: "Doctor Registered successfully",
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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const doctor = await Doctors.findOne({
      where: { email },
      attributes: [
        "id",
        "fullname",
        "email",
        "password",
        "specialization",
        "consultationfee",
        "isVerified",
      ],
    });
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

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
        ? "Doctor Login successfully"
        : "Doctor Login successfully. Account pending verification.",
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

async function addConsultationFee(req, res) {
  try {
    const { id, consultationfee } = req.body;

    if (!id || consultationfee === undefined) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and consultationfee are required",
      });
    }

    const doctor = await Doctors.findByPk(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await Doctors.update(
      { consultationfee: Number(consultationfee) },
      { where: { id } },
    );

    return res.status(200).json({
      success: true,
      message: "Consultation fee updated successfully",
      consultationfee: Number(consultationfee),
    });
  } catch (error) {
    console.error("Add Consultation Fee Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getalldoctors(req, res) {
  try {
    const { specialization, all } = req.query;
    
    const where = {};
    
    // By default, only show verified doctors to patients
    // If all=true is passed (e.g. from admin), show all
    if (all !== "true") {
      where.isVerified = true;
    }
    
    if (specialization) {
      where.specialization = specialization;
    }

    const doctors = await Doctors.findAll({
      where,
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      data: doctors,
      message: "Doctors retrieved successfully",
    });
  } catch (error) {
    console.error("Get All Doctors Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getdocbyId(req, res) {
  try {
    const { id } = req.params;
    const doctor = await Doctors.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor,
      message: "Doctor retrieved successfully",
    });
  } catch (error) {
    console.error("Get Doctor By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  register,
  login,
  addConsultationFee,
  getalldoctors,
  getdocbyId,
};
