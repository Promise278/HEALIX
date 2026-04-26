const { Server } = require("socket.io");
const { Message } = require("./models");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // User authentication (optional but recommended in real scenario)
    socket.on("authenticate", (data) => {
      socket.userId = data.userId;
      socket.userType = data.userType;
      console.log(`Authenticated: ${data.userId} as ${data.userType}`);
    });

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User with ID: ${socket.id} joined room: ${conversationId}`);
    });

    socket.on("send_message", async (data) => {
      try {
        // data format: { conversationId, senderId, senderModel, content }
        const newMessage = await Message.create({
          conversationId: data.conversationId,
          senderId: data.senderId,
          senderModel: data.senderModel,
          content: data.content,
        });

        // Broadcast to everyone in the room except the sender
        socket.to(data.conversationId).emit("receive_message", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket };
