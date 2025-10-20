const express = require("express")
const verifyToken = require("../middleware/token.middleware")
const router = express.Router()

router.post("/seedoctors", verifyToken, patientregister)
router.post("/dashboard", verifyToken, patientdashboard)

module.exports = router