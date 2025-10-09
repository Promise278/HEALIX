const express = require("express")
const { doctorregister, doctorlogin } = require("../controllers/Doctor.controllers")
const router = express.Router()

router.post("/doctorregister", doctorregister)
router.post("/doctorlogin", doctorlogin)

module.exports = router