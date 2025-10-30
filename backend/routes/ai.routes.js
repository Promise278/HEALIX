const express = require("express")
const { default: handler } = require("../controllers/ai.controller")
const router = express.Router()

router.post("/ai/health", handler)

module.exports = router