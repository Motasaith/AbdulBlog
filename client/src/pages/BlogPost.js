import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";

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
  }, [id, fetchComments]); // eslint-disable-line react-hooks/exhaustive-deps

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

  if (!post) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading post...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                    Abdul
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 font-medium tracking-wider">
                    BLOG
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
                Home
              </Link>
              <Link to="/blogs" className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                Articles
              </Link>
              <Link to="/about" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
                About
              </Link>
              <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
                Contact
              </Link>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200" 
                onClick={() => setDarkMode(!darkMode)}
              >
                <i className={`fas fa-${darkMode ? "sun" : "moon"} text-lg`}></i>
              </button>
              <Link to="/login" className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                Sign In
              </Link>
              <button 
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200" 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t border-gray-200 shadow-lg ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="px-4 py-4 space-y-1">
            <Link to="/" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/blogs" className="block px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium" onClick={() => setMenuOpen(false)}>
              Articles
            </Link>
            <Link to="/about" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-200">
              <Link to="/login" className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Post Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Link to="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Articles
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <i className="fas fa-user mr-2"></i>
                <span>{post.author || "Abdul Rauf Azhar"}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {post.thumbnail && (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-purple-600 prose-code:bg-purple-50 prose-pre:bg-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Author Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AR</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Abdul Rauf Azhar</h3>
                <p className="text-gray-600 leading-relaxed">
                  I'm Abdul Rauf, a developer who loves clean UI and writing about tech that matters.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <i className="fas fa-envelope text-blue-600"></i>
                  <a href="mailto:abdulrauf.azhar@proton.me" className="hover:text-blue-600 transition-colors">
                    Contact me
                  </a>
                </div>
                
                <div className="flex justify-center space-x-4 pt-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Popular Articles</h4>
              <div className="space-y-4">
                {/* This would be populated with actual popular posts in a real app */}
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Getting Started with React</h5>
                    <p className="text-gray-600 text-xs">A comprehensive guide to React basics</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Modern CSS Techniques</h5>
                    <p className="text-gray-600 text-xs">Explore the latest CSS features</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">JavaScript ES6+</h5>
                    <p className="text-gray-600 text-xs">Modern JavaScript features explained</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'Web Dev', 'Tutorial', 'CSS', 'Node.js'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Comment</h3>
          
          <form className="space-y-6 mb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Comment *
              </label>
              <textarea
                id="comment"
                rows="5"
                placeholder="Share your thoughts..."
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Post Comment
            </button>
          </form>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">
              Comments ({comments.length})
            </h4>
            
            {comments.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
            
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {comment.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-semibold text-gray-900">{comment.name}</h5>
                        <span className="text-gray-500 text-sm">
                          {new Date(comment.date || comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                AbdulBlog
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Sharing knowledge, insights, and experiences from the world of technology and development.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Articles</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Web Development</span></li>
                <li><span className="text-gray-400">Programming</span></li>
                <li><span className="text-gray-400">Technology</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AbdulBlog. All rights reserved. Made with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        id="scrollToTopBtn" 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50"
        title="Go to top"
        style={{ display: 'none' }}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </div>
  );
};

export default BlogPost;
