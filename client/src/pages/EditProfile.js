import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const [adminId, setAdminId] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admins/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const admin = res.data;
        setAdminId(admin._id);
        setProfilePicUrl(admin.profilePicUrl || "");
        setFullName(admin.fullName || "");
        setBio(admin.bio || "");
        setEmail(admin.email || "");
        setTwitter(admin.twitter || "");
        setGithub(admin.github || "");
        setLinkedin(admin.linkedin || "");
        setPronouns(admin.pronouns || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to load profile.");
      }
    };

    fetchProfile();

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

  const previewImage = profilePicFile
    ? URL.createObjectURL(profilePicFile)
    : profilePicUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      profilePicUrl,
      fullName,
      bio,
      email,
      twitter,
      github,
      linkedin,
      pronouns,
    };

    if (password.trim() !== "") {
      updatedProfile.password = password;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admins/${adminId}/profile`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile-page">
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
          <h2>Edit Profile</h2>
        </div>
      </section>

      <main className="container main-grid">
        <div className="form-wrapper">
          <form className="edit-form" onSubmit={handleSubmit}>
            <label>Profile Picture (URL)</label>
            <input
              type="text"
              value={profilePicUrl}
              onChange={(e) => setProfilePicUrl(e.target.value)}
              placeholder="Image URL"
            />

            <label>Or Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicFile(e.target.files[0])}
            />

            {previewImage && (
              <img src={previewImage} alt="Preview" className="preview-image" />
            )}

            <label>Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label>Short Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Twitter</label>
            <input
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />

            <label>GitHub</label>
            <input value={github} onChange={(e) => setGithub(e.target.value)} />

            <label>LinkedIn</label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <label>Pronouns</label>
            <select
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
            >
              <option value="">Select…</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>

            <label>Change Password</label>
            <input
              type="password"
              value={password}
              placeholder="Leave blank to keep current"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Save Changes</button>
          </form>
        </div>

        <aside className="edit-sidebar">
          <h3>Tips</h3>
          <p>
            Use a clear square photo. Fill only active links. Keep your bio
            short.
          </p>
        </aside>
      </main>

      <footer className="edit-footer">
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

export default EditProfile;
