import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchMessages();

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

    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/af04cde8cd.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this message?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="messages-page">
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
          <h2>Contact Messages</h2>
          <p>View and manage user-submitted messages.</p>
        </div>
      </section>

      <main className="container message-list">
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <div className="msg-header">
                <strong>{msg.subject}</strong>
                <span>{new Date(msg.date).toLocaleDateString()}</span>
              </div>
              <p>
                <strong>From:</strong> {msg.name} ({msg.email})
              </p>
              <p className="msg-body">{msg.message}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(msg._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
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

export default Messages;
