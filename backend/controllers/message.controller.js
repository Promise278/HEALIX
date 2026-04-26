const { Message, sequelize, Doctors } = require("../models");
const { Op } = require("sequelize");

async function getMessages(req, res) {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required",
      });
    }

    const messages = await Message.findAll({
      where: { conversationId },
      order: [["timestamp", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getConversations(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find all unique conversationIds where this user was a sender
    // NOTE: In a more robust system, we would have a Conversations table or receiverId.
    // For now, we group by conversationId for messages sent by the user.
    const conversations = await Message.findAll({
      where: {
        senderId: userId,
      },
      attributes: [
        "conversationId",
        [sequelize.fn("MAX", sequelize.col("timestamp")), "lastMessageTime"],
      ],
      group: ["conversationId"],
      order: [[sequelize.fn("MAX", sequelize.col("timestamp")), "DESC"]],
      raw: true,
    });

    // Fetch the last message content for each conversation
    const detailedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const lastMsg = await Message.findOne({
          where: { conversationId: conv.conversationId },
          order: [["timestamp", "DESC"]],
        });

        // Try to find a doctor with this ID (assuming conversationId is doctorId for now)
        const doctor = await Doctors.findByPk(conv.conversationId, {
          attributes: ["fullname", "specialization"],
        });

        return {
          conversationId: conv.conversationId,
          lastMessage: lastMsg.content,
          timestamp: lastMsg.timestamp,
          senderModel: lastMsg.senderModel,
          doctorName: doctor ? doctor.fullname : "Medical Team",
          specialty: doctor ? doctor.specialization : "Support",
          online: true, // Placeholder
        };
      }),
    );

    return res.status(200).json({
      success: true,
      data: detailedConversations,
    });
  } catch (error) {
    console.error("Get Conversations Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function sendMessage(req, res) {
  try {
    const { conversationId, senderId, senderModel, content } = req.body;

    if (!conversationId || !senderId || !senderModel || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      conversationId,
      senderId,
      senderModel,
      content,
    });

    return res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  getMessages,
  sendMessage,
  getConversations,
};
