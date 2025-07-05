const Post = require("../models/Post");

// ✅ Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags, thumbnail } = req.body;
    const newPost = new Post({
      title,
      content,
      tags,
      thumbnail,
      createdBy: req.user.id,
    });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
};

// ✅ Get all non-deleted posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ deleted: false }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
};

// ✅ Get a single post
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, deleted: false });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
};

// ✅ Update post
exports.updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post updated", post: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating post", error: err.message });
  }
};

// ✅ Soft delete
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post moved to trash" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
  }
};

// ✅ Get all soft-deleted posts
exports.getTrashedPosts = async (req, res) => {
  try {
    const trashed = await Post.find({ deleted: true }).sort({ deletedAt: -1 });
    res.json(trashed);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching trash", error: err.message });
  }
};

// ✅ Restore a deleted post
exports.restorePost = async (req, res) => {
  try {
    const restored = await Post.findByIdAndUpdate(
      req.params.id,
      { deleted: false, deletedAt: null },
      { new: true }
    );
    if (!restored) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post restored", post: restored });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error restoring post", error: err.message });
  }
};
