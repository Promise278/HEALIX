const express = require("express");
const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
} = require("../controllers/appointment.controller");
const verifyToken = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create", verifyToken, createAppointment);
router.get("/patient", verifyToken, getPatientAppointments);
router.get("/doctor", verifyToken, getDoctorAppointments);

module.exports = router;
