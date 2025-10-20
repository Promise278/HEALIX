const express = require("express")
const { patientregister, patientlogin } = require("../controllers/auth.controller")
const router = express.Router()

router.post("/patientregister", patientregister)
router.post("/patientlogin", patientlogin)

module.exports = router