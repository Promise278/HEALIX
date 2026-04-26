const { Doctors, Patients } = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctors.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      data: doctors,
      message: "Doctors retrieved successfully",
    });
  } catch (error) {
    console.error("Get Doctors Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getAllPatients(req, res) {
  try {
    const patients = await Patients.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      data: patients,
      message: "Patients retrieved successfully",
    });
  } catch (error) {
    console.error("Get Patients Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Hardcoded admin credentials as requested
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
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password",
      });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function verifyDoctor(req, res) {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    if (isVerified === undefined) {
      return res.status(400).json({
        success: false,
        message: "isVerified status is required",
      });
    }

    const doctor = await Doctors.findByPk(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await Doctors.update({ isVerified }, { where: { id } });

    return res.status(200).json({
      success: true,
      message: `Doctor ${isVerified ? "verified" : "unverified"} successfully`,
      data: { id, isVerified },
    });
  } catch (error) {
    console.error("Verify Doctor Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  getAllDoctors,
  getAllPatients,
  adminLogin,
  verifyDoctor,
};
