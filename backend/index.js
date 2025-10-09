const express = require('express')
const PORT = 5000;
const app = express();
const authRoutes = require("./routes/Doctor.routes")
const apiRouthes = require("./routes/auth.routes")

app.use(express.json())

app.get('/',(req, res) => {
    console.log("Welcome to the page")
    res.send("Welcome to your homepage")
})

app.use('/api', apiRouthes)
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`→ Network: http://10.252.178.237:${PORT}`);
})