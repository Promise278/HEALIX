const express = require("express");
const {
  getAllDoctors,
  getAllPatients,
} = require("../controllers/admin.controller");
const router = express.Router();

router.get("/doctors", getAllDoctors);
router.get("/patients", getAllPatients);

module.exports = router;
