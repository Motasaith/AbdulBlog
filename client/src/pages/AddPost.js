import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import "../style.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("**Start writing your blog here...**");

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const toggleBtn = document.getElementById("darkToggle");
    const body = document.body;
    const menuIcon = document.getElementById("menuIcon");
    const navLinks = document.getElementById("navLinks");
    const scrollBtn = document.getElementById("scrollToTopBtn");

    if (toggleBtn) {
      toggleBtn.onclick = () => {
        body.classList.toggle("dark");
      };
    }

    if (menuIcon && navLinks) {
      menuIcon.onclick = () => {
        navLinks.classList.toggle("show");
      };
    }

    if (scrollBtn) {
      window.onscroll = function () {
        if (
          document.body.scrollTop > 300 ||
          document.documentElement.scrollTop > 300
        ) {
          scrollBtn.style.display = "block";
        } else {
          scrollBtn.style.display = "none";
        }
      };

      scrollBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    }

    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/af04cde8cd.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        { title, thumbnail, excerpt, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post created successfully!");
      navigate("/admin/manage-posts");
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Failed to create post.");
    }
  };

  return (
    <>
      {/* Header */}
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

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h2>Add New Blog Post</h2>
        </div>
      </section>

      {/* Main Grid */}
      <main className="container main-grid">
        <section className="blog-posts">
          <div className="post">
            <form className="contact-form" onSubmit={handleSubmit}>
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

              <label>Post Body</label>
              <div data-color-mode="light" className="quill-editor">
                <MDEditor value={content} onChange={setContent} />
              </div>

              <button type="submit">Publish</button>
            </form>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* <img
            src="/Profile picture (5).png"
            className="author-pic"
            alt="Admin"
          /> */}
          <h3>Quick Tip</h3>
          <p>Use ** for bold, * for italic, and ` for code in markdown!</p>
        </aside>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2025 AbdulBlog. All rights reserved.</p>
        </div>
      </footer>

      <button id="scrollToTopBtn" title="Go to top">
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
};

export default AddPost;
