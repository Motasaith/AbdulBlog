const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "editor"], default: "editor" },
  fullName: String,
  bio: String,
  email: String,
  twitter: String,
  github: String,
  linkedin: String,
  pronouns: String,
  profilePicUrl: String,
});

module.exports = mongoose.model("Admin", adminSchema);
