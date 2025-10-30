const express = require("express")
const verifyToken = require("../middleware/token.middleware")
const { getalldoctors, getdocbyId } = require("../controllers/patient.controller")
const router = express.Router()

router.get("/seedoctors", verifyToken, getalldoctors)
router.get("/seedoctor/:id", verifyToken, getdocbyId)
// router.post("/dashboard", verifyToken, patientdashboard)

module.exports = router