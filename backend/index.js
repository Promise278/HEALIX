const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./socket");
const db = require("./models");

// Route Imports
const authRoutes = require("./routes/auth.routes");
const doctorRoutes = require("./routes/Doctor.routes");
const adminRoutes = require("./routes/admin.routes");
const aiRoutes = require("./routes/ai.routes");
const messageRoutes = require("./routes/message.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/messages", messageRoutes);

const server = http.createServer(app);
const io = initSocket(server);

db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Database Connected Successfully`);
    console.log(`Server running on port ${PORT}`);
  });
});
