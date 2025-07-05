import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";

const About = () => {
  useEffect(() => {
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
        <section>
          <h2>About Me</h2>
          <p>
            Hello! I'm Abdul Rauf Azhar, a passionate self-taught developer
            exploring the worlds of full-stack development, cybersecurity, and
            content creation. I love building useful tools and blogging about
            the real world from a deep, thoughtful perspective.
          </p>

          <p>
            This blog is a collection of insights, tutorials, and personal
            lessons — a place to inspire others through words and code.
          </p>

          <h3>What I Do</h3>
          <ul>
            <li>🧠 Full-stack development projects</li>
            <li>🧪 Experiments with AI, data science, and ethical hacking</li>
            <li>✍️ Writing meaningful content (tech + tales)</li>
          </ul>

          <h3>Hobbies</h3>
          <p>
            I enjoy discovering new concepts, anime, quiet moments, and avoiding
            distractions while diving deep into learning.
          </p>
        </section>

        <aside className="sidebar">
          {/* <img
            src="/Profile picture (5).png"
            className="author-pic"
            alt="Author"
          /> */}
          <h3>Let's Connect</h3>
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

export default About;
