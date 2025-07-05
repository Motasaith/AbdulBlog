import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Read role from localStorage
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    // Handle dark mode toggle and nav
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

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <>
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
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <button className="login-btn" onClick={handleLogout}>
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Logging out...
                    </>
                  ) : (
                    "Logout"
                  )}
                </button>
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
          <h2>Admin Dashboard</h2>
          <p>Manage blog posts, profile, messages, and more</p>
        </div>
      </section>

      <main className="container main-grid">
        <section className="blog-posts">
          <div className="post">
            <h3>Manage Blog Posts</h3>
            <p>Add, edit, view or delete posts.</p>
            <Link to="/admin/manage-posts">Manage Posts</Link>
          </div>

          <div className="post">
            <h3>Add New Post</h3>
            <p>Create and publish a new blog post.</p>
            <Link to="/admin/add-post">Add New Post</Link>
          </div>

          <div className="post">
            <h3>Trash Bin</h3>
            <p>Restore deleted posts within 30 days.</p>
            <Link to="/admin/trash">Go to Trash Bin</Link>
          </div>

          <div className="post">
            <h3>Edit Profile</h3>
            <p>Update your profile details shown on the blog.</p>
            <Link to="/admin/profile">Edit Profile</Link>
          </div>

          <div className="post">
            <h3>Register New Admin</h3>
            <p>Create new admin account for site access.</p>
            <Link to="/admin/register">Add New Admin</Link>
          </div>

          {/* Only show for "admin" role */}
          {role === "admin" && (
            <>
              <div className="post">
                <h3>Contact Messages</h3>
                <p>View and respond to messages from readers.</p>
                <Link to="/admin/messages">Manage Messages</Link>
              </div>

              <div className="post">
                <h3>Site Stats</h3>
                <p>Track blog traffic and post engagement.</p>
                <Link to="/admin/stats">View Stats</Link>
              </div>

              <div className="post">
                <h3>Manage Admins</h3>
                <p>View or remove admin accounts.</p>
                <Link to="/admin/manage-admins">Go to Admins</Link>
              </div>
            </>
          )}
        </section>

        {/* OPTIONAL: remove sidebar if not needed */}
        <aside className="sidebar">
          <img
            src="public/Profile picture (5).png"
            className="author-pic"
            alt="Admin"
          />
          <h3>Admin Info</h3>
          <p>You are logged in as the site administrator.</p>
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
    </>
  );
};

export default AdminDashboard;
