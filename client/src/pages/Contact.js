import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/messages`,
        formData
      );
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

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

    if (toggleBtn) toggleBtn.onclick = () => body.classList.toggle("dark");
    if (menuIcon && navLinks)
      menuIcon.onclick = () => navLinks.classList.toggle("show");

    if (scrollBtn) {
      window.onscroll = function () {
        scrollBtn.style.display =
          document.documentElement.scrollTop > 300 ? "block" : "none";
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
          <h2>Contact Me</h2>
          <p>
            If you’d like to collaborate, have a question, or want to share
            feedback — just drop me a message below!
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Send Message</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>

        <aside className="sidebar">
          {/* <img
            src="/Profile picture (5).png"
            className="author-pic"
            alt="Author"
          /> */}
          <h3>Other Ways</h3>
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

export default Contact;
