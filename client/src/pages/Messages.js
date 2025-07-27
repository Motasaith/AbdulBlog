import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { 
  ChatBubbleLeftRightIcon,
  TrashIcon,
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, subject) => {
    if (!window.confirm(`Delete message: "${subject}"?`)) return;

    try {
      await api.delete(`/api/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete message.");
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

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
                onClick={() => handleDelete(msg._id, msg.subject)}
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
