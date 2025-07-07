import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/TrashBin.css";

const TrashBin = () => {
  const [trashedPosts, setTrashedPosts] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchTrashedPosts();

    const toggleBtn = document.getElementById("darkToggle");
    const body = document.body;
    const menuIcon = document.getElementById("menuIcon");
    const navLinks = document.getElementById("navLinks");
    const scrollBtn = document.getElementById("scrollToTopBtn");

    if (toggleBtn) toggleBtn.onclick = () => body.classList.toggle("dark");
    if (menuIcon && navLinks) {
      menuIcon.onclick = () => navLinks.classList.toggle("show");
    }
    if (scrollBtn) {
      window.onscroll = function () {
        scrollBtn.style.display =
          document.documentElement.scrollTop > 300 ? "block" : "none";
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

  const fetchTrashedPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts/trash/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrashedPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch trashed posts:", err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}/restore`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrashedPosts((prev) => prev.filter((post) => post._id !== id));
      alert("Post restored successfully!");
    } catch (err) {
      console.error("Restore failed:", err);
      alert("Failed to restore post.");
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirm = window.confirm("Permanently delete this post?");
    if (!confirm) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrashedPosts((prev) => prev.filter((post) => post._id !== id));
      alert("Post permanently deleted.");
    } catch (err) {
      console.error("Permanent delete failed:", err);
      alert("Failed to delete permanently.");
    }
  };

  return (
    <div className="trash-container">
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
          <h2>Trash Bin</h2>
          <p>Restore or permanently delete posts</p>
        </div>
      </section>

      <main className="container trash-main">
        <section>
          <ul className="posts-list">
            {trashedPosts.length === 0 ? (
              <p>No trashed posts.</p>
            ) : (
              trashedPosts.map((post) => (
                <li key={post._id} className="post-item">
                  <img
                    src={post.image || "https://via.placeholder.com/400x200"}
                    alt={post.title}
                    className="post-thumb"
                  />
                  <h3>{post.title}</h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p>{post.excerpt}</p>
                  <div className="post-actions">
                    <button
                      onClick={() => handleRestore(post._id)}
                      className="btn-action btn-restore"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(post._id)}
                      className="btn-action btn-delete"
                    >
                      Delete Permanently
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <aside className="sidebar">
          <h3>Tip</h3>
          <p>Posts stay here for 30 days before being deleted permanently.</p>
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

export default TrashBin;
