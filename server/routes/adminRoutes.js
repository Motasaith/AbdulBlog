const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const { verifyToken, checkRole } = require("../middleware/auth");

// Get all admins
router.get("/", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete admin
router.delete("/:id", verifyToken, checkRole("admin"), async (req, res) => {
  const { id } = req.params;

  if (req.user.id === id) {
    return res.status(400).json({ error: "You can't delete yourself." });
  }

  try {
    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Admin not found." });
    res.json({ message: "Admin deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update admin role
router.put("/:id/role", verifyToken, checkRole("admin"), async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!["admin", "editor"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const updated = await Admin.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Admin not found" });

    res.json({ message: "Role updated", admin: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update profile (full name, bio, links, etc.)
router.put("/:id/profile", verifyToken, async (req, res) => {
  const { id } = req.params;

  if (req.user.id !== id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Not authorized to update this profile" });
  }

  const {
    fullName,
    bio,
    email,
    twitter,
    github,
    linkedin,
    pronouns,
    profilePicUrl,
    password, // optional
  } = req.body;

  try {
    const updateData = {
      fullName,
      bio,
      email,
      twitter,
      github,
      linkedin,
      pronouns,
      profilePicUrl,
    };

    // Handle optional password change
    if (password) {
      const bcrypt = require("bcryptjs");
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updated = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Admin not found" });

    res.json({ message: "Profile updated", admin: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current admin profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
