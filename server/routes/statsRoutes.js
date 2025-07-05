const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const Post = require("../models/Post");
const Message = require("../models/Message"); // if you store contact messages

router.get("/", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalViews = await Post.aggregate([
      { $group: { _id: null, views: { $sum: "$views" } } },
    ]);

    const monthlyViews = await Post.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          views: { $sum: "$views" },
        },
      },
    ]);

    res.json({
      totalPosts,
      totalMessages,
      totalViews: totalViews[0]?.views || 0,
      monthlyViews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
