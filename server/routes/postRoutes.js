const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/verifyToken");

// ✅ CREATE a new post
router.post("/", verifyToken, async (req, res) => {
  const { title, content, excerpt, tags, thumbnail } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      excerpt,
      tags: tags || [],
      thumbnail,
      createdBy: req.user.id,
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message });
  }
});

// ✅ GET all posts (optionally filtered)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ deleted: false }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ✅ GET trashed posts (MUST come before /:id route)
router.get("/trash/all", verifyToken, async (req, res) => {
  try {
    const trashedPosts = await Post.find({ deleted: true }).sort({
      deletedAt: -1,
    });
    res.json(trashedPosts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trash" });
  }
});

// GET single post by ID (MUST come after specific routes)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Post not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// ✅ SOFT DELETE (move to Trash)
router.put("/:id/delete", verifyToken, async (req, res) => {
  try {
    const trashed = await Post.findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!trashed) return res.status(404).json({ error: "Post not found" });

    res.json({ message: "Post moved to trash" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});


// ✅ RESTORE post
router.put("/:id/restore", verifyToken, async (req, res) => {
  try {
    const restored = await Post.findByIdAndUpdate(
      req.params.id,
      { deleted: false, deletedAt: null },
      { new: true }
    );
    if (!restored) return res.status(404).json({ error: "Post not found" });

    res.json({ message: "Post restored" });
  } catch (err) {
    res.status(500).json({ error: "Failed to restore post" });
  }
});

// ✅ PERMANENT DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const removed = await Post.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Post not found" });

    res.json({ message: "Post permanently deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to permanently delete post" });
  }
});

module.exports = router;
