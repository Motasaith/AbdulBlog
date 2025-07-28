import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

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

    if (toggleBtn) toggleBtn.onclick = () => body.classList.toggle("dark");
    if (menuIcon && navLinks)
      menuIcon.onclick = () => navLinks.classList.toggle("hidden");

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
              <Link to="/blogs" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
                Articles
              </Link>
              <Link to="/about" className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                About
              </Link>
              <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
                Contact
              </Link>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200" id="darkToggle">
                <i className="fas fa-moon text-lg"></i>
              </button>
              <Link to="/login" className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                Sign In
              </Link>
              <button className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200" id="menuIcon">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg hidden" id="navLinks">
          <div className="px-4 py-4 space-y-1">
            <Link to="/" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
              Home
            </Link>
            <Link to="/blogs" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
              Articles
            </Link>
            <Link to="/about" className="block px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
              About
            </Link>
            <Link to="/contact" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover more about my journey, my work, and the things that drive my passion for technology and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Me Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Hello! I'm Abdul Rauf Azhar, a passionate self-taught developer exploring the worlds of full-stack development,
                  cybersecurity, and content creation. I love building useful tools and blogging about the real world from a deep,
                  thoughtful perspective.
                </p>
                <p className="text-lg leading-relaxed">
                  This blog is a collection of insights, tutorials, and personal lessons — a place to inspire others through
                  words and code.
                </p>
              </div>
            </div>

            {/* What I Do Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What I <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Do</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">🧠</div>
                  <h4 className="font-semibold text-gray-900 mb-3">Full-Stack Development</h4>
                  <p className="text-gray-600">Building comprehensive web applications from frontend to backend</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">🧪</div>
                  <h4 className="font-semibold text-gray-900 mb-3">AI & Cybersecurity</h4>
                  <p className="text-gray-600">Experimenting with AI, data science, and ethical hacking</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">✍️</div>
                  <h4 className="font-semibold text-gray-900 mb-3">Content Creation</h4>
                  <p className="text-gray-600">Writing meaningful content combining tech insights and personal tales</p>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">2018 - The Beginning</h4>
                    <p className="text-gray-600">Started my programming journey with curiosity and determination</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">2019 - First Web App</h4>
                    <p className="text-gray-600">Built my first functional web application and fell in love with development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">2020 - Expanding Horizons</h4>
                    <p className="text-gray-600">Explored cybersecurity, AI, and deepened my technical knowledge</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">2021 - AbdulBlog Launch</h4>
                    <p className="text-gray-600">Started this blog to share my journey and connect with fellow developers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">2022-Present - Contributing & Growing</h4>
                    <p className="text-gray-600">Contributing to open-source projects and continuously learning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hobbies & Interests */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Beyond <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Code</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-2">📚</div>
                  <p className="font-medium text-gray-700">Reading</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-2">🎌</div>
                  <p className="font-medium text-gray-700">Anime</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-2">🧘</div>
                  <p className="font-medium text-gray-700">Meditation</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-2">🎵</div>
                  <p className="font-medium text-gray-700">Music</p>
                </div>
              </div>
              <p className="text-gray-600">
                I enjoy discovering new concepts, quiet moments of reflection, and avoiding distractions while diving deep into learning.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">AR</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Abdul Rauf Azhar</h3>
                <p className="text-gray-600 leading-relaxed">
                  Self-taught Developer & Content Creator
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <i className="fas fa-envelope text-blue-600"></i>
                  <a href="mailto:abdulrauf.azhar@proton.me" className="hover:text-blue-600 transition-colors">
                    abdulrauf.azhar@proton.me
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
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Years Coding</span>
                  <span className="font-semibold text-gray-900">6+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Blog Posts</span>
                  <span className="font-semibold text-gray-900">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-semibold text-gray-900">15+</span>
                </div>
              </div>
            </div>
            
            {/* Tech Stack */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'Express', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium cursor-pointer transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
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

export default About;
