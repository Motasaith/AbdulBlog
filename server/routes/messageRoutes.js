const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const { verifyToken, checkRole } = require("../middleware/auth");

// POST /api/messages — for contact form (public, no auth)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMsg = new Message({ name, email, subject, message });
    await newMsg.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message." });
  }
});

// GET /api/messages — admin only
router.get("/", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// New public GET /api/messages/public route to fetch comments by postId
router.get("/public", async (req, res) => {
  try {
    const { postId } = req.query;
    if (!postId) {
      return res
        .status(400)
        .json({ error: "postId query parameter is required" });
    }
    const subjectFilter = `Comment:${postId}`;
    const messages = await Message.find({ subject: subjectFilter }).sort({
      date: -1,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch public messages." });
  }
});

// DELETE /api/messages/:id — delete message
router.delete("/:id", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete message." });
  }
});

module.exports = router;
