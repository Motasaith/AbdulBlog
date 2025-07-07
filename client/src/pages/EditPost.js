import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import "../styles/EditPost.css";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const post = res.data;
        setTitle(post.title);
        setThumbnail(post.thumbnail);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setLoading(false);
      } catch (err) {
        alert("Failed to load post.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        { title, thumbnail, excerpt, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post updated successfully.");
      navigate("/admin/manage-posts");
    } catch (err) {
      alert("Failed to update post.");
      console.error(err);
    }
  };

  return (
    <div className="edit-post-page">
      <header>
        <div className="container nav-container">
          <h1 className="logo">AbdulBlog</h1>
          <nav>
            <ul className="nav-links" id="navLinks">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
            </ul>
            <button className="dark-toggle" id="darkToggle">
              <i className="fas fa-moon"></i>
            </button>
            <div className="menu-icon" id="menuIcon">
              <i className="fas fa-bars"></i>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Edit Blog Post</h2>
        </div>
      </section>

      <main className="container edit-main-grid">
        {loading ? (
          <p>Loading post...</p>
        ) : (
          <form className="edit-form" onSubmit={handleUpdate}>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Image URL</label>
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />

            <label>Excerpt</label>
            <input
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />

            <label>Post Content</label>
            <div data-color-mode="light">
              <MDEditor value={content} onChange={setContent} />
            </div>

            <button type="submit">Update Post</button>
          </form>
        )}

        <aside className="sidebar">
          <h3>Tips</h3>
          <p>Make sure to proofread your content before publishing.</p>
          <p>Add a good featured image (16:9 aspect ratio recommended).</p>
          <p>Use markdown to add headings, links, and lists.</p>
        </aside>
      </main>

      <footer>
        <div className="container">
          <p>© 2025 AbdulBlog. All rights reserved.</p>
        </div>
      </footer>

      <button id="scrollToTopBtn" title="Go to top">
        <i className="fas fa-chevron-up"></i>
      </button>
    </div>
  );
};

export default EditPost;
