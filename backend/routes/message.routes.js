const express = require("express");
const { getMessages, sendMessage, getConversations } = require("../controllers/message.controller");
const verifyToken = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/conversations/:userId", verifyToken, getConversations);
router.get("/:conversationId", verifyToken, getMessages);
router.post("/", verifyToken, sendMessage);

module.exports = router;
