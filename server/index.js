require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const postRoutes = require("./routes/postRoutes"); // ✅ new
const initAdminUser = require("./utils/initAdmin");

const app = express(); // Moved app declaration to the top
const PORT = process.env.PORT || 5000;

const messageRoutes = require("./routes/messageRoutes");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);

const statsRoutes = require("./routes/statsRoutes");
app.use("/api/stats", statsRoutes);

// const commentRoutes = require("./routes/commentRoutes");
// app.use("/api/comments", commentRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/posts", postRoutes); // ✅ new

// DB and Server
connectDB().then(() => {
  initAdminUser(); // Auto-create default admin
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});

const cors = require("cors");
app.use(cors());
