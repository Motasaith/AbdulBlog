import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/BlogPost.css"; // Make sure this path is correct

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [comments, setComments] = useState([]);

  // New state for dark mode and menu toggle
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch post data
  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  // Fetch comments using messages API
  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/messages/public?postId=${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  }, [id]);

  // Effect to apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  // Load FontAwesome script once
  useEffect(() => {
    const scriptId = "fontAwesomeScript";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://kit.fontawesome.com/af04cde8cd.js";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Scroll to top button logic
  useEffect(() => {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;
    const handleScroll = () => {
      if (!scrollBtn) return;
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    scrollBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Load post and comments on mount
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id, fetchComments]);

  // Handle comment form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/messages", {
        name: form.name,
        email: form.email,
        subject: `Comment:${id}`,
        message: form.message,
      });
      setForm({ name: "", email: "", message: "" });
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  if (!post) return <div className="container">Loading post...</div>;

  return (
    <>
      <header>
        <div className="container nav-container">
          <h1 className="logo">AbdulBlog</h1>
          <nav>
            <ul className={`nav-links${menuOpen ? " show" : ""}`} id="navLinks">
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" onClick={() => setMenuOpen(false)}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
            <button
              className="dark-toggle"
              id="darkToggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              <i className={`fas fa-${darkMode ? "sun" : "moon"}`}></i>
            </button>
            <div
              className="menu-icon"
              id="menuIcon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fas fa-bars"></i>
            </div>
          </nav>
        </div>
      </header>

      <main className="container main-grid">
        <article className="blog-post-full">
          {post.thumbnail && <img src={post.thumbnail} alt={post.title} />}
          <h2>{post.title}</h2>
          <p>
            <strong>Posted on:</strong>{" "}
            {new Date(post.createdAt).toLocaleDateString()} |{" "}
            <strong>Author:</strong> {post.author || "Abdul Rauf Azhar"}
          </p>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="sidebar">
          {/* <img
            src="/Profile picture (5).png"
            className="author-pic"
            alt="Author"
          /> */}
          <h3>Author</h3>
          <p>
            I’m Abdul Rauf, a developer who loves clean UI and writing about
            tech that matters.
          </p>
        </aside>
      </main>

      <section className="container">
        <h3>Leave a Comment</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            rows="5"
            placeholder="Your Comment"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button type="submit">Post Comment</button>
        </form>

        <h4>Comments</h4>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c, i) => (
          <div key={i} className="comment">
            <strong>{c.name}</strong>{" "}
            <em>({new Date(c.date || c.createdAt).toLocaleDateString()})</em>
            <p>{c.message}</p>
          </div>
        ))}
      </section>

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

export default BlogPost;
