const express = require("express");
const {
  register,
  login,
  addConsultationFee,
} = require("../controllers/Doctor.controller");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware")
const { getalldoctors, getdocbyId } = require("../controllers/Doctor.controller")


router.post("/doctorregister", register);
router.post("/doctorlogin", login);
router.put("/fee", addConsultationFee);
router.get("/seedoctor/:id", verifyToken, getdocbyId)
router.get("/seedoctors", verifyToken, getalldoctors)

module.exports = router;
