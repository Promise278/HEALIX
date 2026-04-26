const express = require("express");
const {
  getAllDoctors,
  getAllPatients,
  adminLogin,
  verifyDoctor,
} = require("../controllers/admin.controller");
const router = express.Router();

router.get("/doctors", getAllDoctors);
router.get("/patients", getAllPatients);
router.post("/login", adminLogin);
router.patch("/doctors/:id/verify", verifyDoctor);

module.exports = router;
