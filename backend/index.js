const express = require('express')
require('dotenv').config();
const app = express();
const cors = require('cors')
const authRoutes = require("./routes/Doctor.routes")
const apiRouthes = require("./routes/auth.routes")
const AiHealth = require("./routes/ai.routes")

app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/',(req, res) => {
    console.log("Welcome to the page")
    res.send("Welcome to your homepage")
})

app.use('/api', apiRouthes)
app.use('/auth', authRoutes)
app.use('/api', AiHealth)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`→ Network: http://10.252.178.237:${PORT}`);
})