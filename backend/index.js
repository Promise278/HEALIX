const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/Doctor.routes");
const apiRouthes = require("./routes/auth.routes");
const AiHealth = require("./routes/ai.routes");
const SeeDoctors = require("./routes/Doctor.routes");
const adminRoutes = require("./routes/admin.routes");
const { PlayCircle } = require("lucide-react");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api", apiRouthes);
app.use("/auth", authRoutes);
app.use("/api", AiHealth);
app.use("/docs", SeeDoctors);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(
    `Database Connected Successfully and Server running on port ${PORT}`,
  );
  console.log(`→ Network: http://10.252.178.237:${PORT}`);
});
