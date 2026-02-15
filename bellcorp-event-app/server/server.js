const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes"); // ← ONLY ONE TIME

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes); // ← correct path

app.get("/", (req, res) => {
  res.send("Server is running...");
});

sequelize.sync();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
