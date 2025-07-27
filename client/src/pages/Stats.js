import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/Stats.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Stats = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalMessages: 0,
  });

  const [monthlyViews, setMonthlyViews] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/stats");
        setStats(res.data);
        setMonthlyViews(res.data.monthlyViews || []);
      } catch (err) {
        console.error("Error fetching stats:", err.message);
        alert("Failed to load statistics.");
      }
    };

    fetchStats();

    // UI Scripts
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
          document.body.scrollTop > 300 ||
          document.documentElement.scrollTop > 300
            ? "block"
            : "none";
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
  }, [token]);

  return (
    <div className="stats-page">
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
          <h2>Site Statistics</h2>
          <p>Track blog performance and engagement</p>
        </div>
      </section>

      <main className="container stats-grid">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats.totalPosts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <p>{stats.totalViews.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Messages Received</h3>
          <p>{stats.totalMessages}</p>
        </div>

        <div className="stat-chart">
          <h3>Monthly Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyViews}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
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

export default Stats;
