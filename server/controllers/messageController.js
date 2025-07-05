// GET /api/messages/public?postId=...
const getPublicMessages = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({ error: "Missing postId" });
    }

    const messages = await Message.find({
      subject: `Comment:${postId}`,
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    console.error("Error loading public messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
  getPublicMessages, // ✅ export this too
};
