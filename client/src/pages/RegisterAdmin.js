import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Login.css"; // reuse login styles
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
  const [dark, setDark] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/af04cde8cd.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      setMessage("Admin registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Username might already exist.");
    }
  };

  return (
    <div className="login-wrapper">
      <button
        className="dark-toggle login-toggle"
        onClick={() => setDark((prev) => !prev)}
        title="Toggle dark mode"
      >
        <i className={`fas fa-${dark ? "sun" : "moon"}`}></i>
      </button>

      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register New Admin</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="password-input"
          />
          <i
            className={`fas fa-${
              showPassword ? "eye-slash" : "eye"
            } password-icon`}
            onClick={() => setShowPassword((prev) => !prev)}
          ></i>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
        <p className="login-message">{message}</p>
      </form>
    </div>
  );
};

export default RegisterAdmin;
