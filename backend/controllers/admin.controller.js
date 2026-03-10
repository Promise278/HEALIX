const { Doctors, Patients } = require("../models");

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

module.exports = {
  getAllDoctors,
  getAllPatients,
};
