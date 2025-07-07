// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();

    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/af04cde8cd.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

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
  }, []);

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
                <Link to="/login" className="login-btn">
                  Login
                </Link>
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
          <h2>Welcome to Abdul Blog</h2>
          <p>Insights, stories, and tips for developers and thinkers.</p>
        </div>
      </section>

      <main className="container main-grid">
        <section className="blog-posts">
          {Array.isArray(posts) ? (
            posts.map((post) => (
              <article className="post" key={post._id}>
                <img src={post.thumbnail || "/default-image.jpg"} alt="Blog" />
                <h3>{post.title}</h3>
                <p>{post.excerpt || post.content.substring(0, 100) + "..."}</p>
                <Link to={`/blogs/${post._id}`}>Read More</Link>
              </article>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </section>

        <aside className="sidebar">
          {/* <img
            src="/Profile picture (5).png"
            alt="Author"
            className="author-pic"
          /> */}
          <h3>About Me</h3>
          <p>
            I’m a passionate developer sharing insights on tech, code, and
            design.
          </p>
          <h4>Contact</h4>
          <p>
            Email:{" "}
            <a href="mailto:abdulrauf.azhar@proton.me">
              abdulrauf.azhar@proton.me
            </a>
          </p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
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

export default Home;
