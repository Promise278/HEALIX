const express = require("express");
const {
  patientregister,
} = require("../controllers/patient.controller");
const { unifiedLogin } = require("../controllers/auth.controller");
const { generateToken } = require("../controllers/stream.controller");
const router = express.Router();

router.post("/patientregister", patientregister);
router.post("/login", unifiedLogin);
router.post("/generate-stream-token", generateToken);

module.exports = router;
