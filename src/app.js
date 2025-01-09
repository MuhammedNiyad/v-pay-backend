const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the V-Pay"
    })
})
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
