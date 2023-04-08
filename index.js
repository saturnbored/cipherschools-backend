const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/Errors");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const followersRoutes = require("./routes/Followers");

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/followers", followersRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
