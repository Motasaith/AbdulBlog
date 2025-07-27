import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/ManagePosts.css";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchPosts();

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

  const fetchPosts = async () => {
    try {
      const res = await api.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Move this post to trash?");
    if (!confirmDelete) return;

    try {
      await api.put(`/api/posts/${id}/delete`);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  const filteredAndSortedPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt); // assuming posts have createdAt
      }
    });

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="manage-posts-container">
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
          <h2>Manage Blog Posts</h2>
          <p>Edit, delete or view all existing blog entries</p>
        </div>
      </section>

      <main className="container manage-posts-main">
        <section>
          <div className="search-sort-bar">
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>

          <ul className="posts-list">
            {paginatedPosts.map((post) => (
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
                  <Link
                    to={`/blogs/${post._id}`}
                    className="btn-action btn-view"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/edit/${post._id}`}
                    className="btn-action btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn-action btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <h3>Tips</h3>
          <p>Posts moved to trash will be available for 30 days.</p>
          <Link to="/admin/trash">Go to Trash Bin</Link>
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

export default ManagePosts;
