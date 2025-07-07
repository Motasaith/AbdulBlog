import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [dark, setDark] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/af04cde8cd.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    document.body.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const { token, user } = res.data;

      // Save token and user role
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);

      setMessage("Login successful!");

      // Redirect to admin dashboard
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Invalid credentials.");
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

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login as Admin</h2>

        <input
          type="text"
          placeholder="Username or Email"
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
          />
          <i
            className={`fas fa-eye${showPassword ? "" : "-slash"}`}
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#666",
            }}
          />
        </div>

        <button type="submit">Login</button>
        <p className="login-message">{message}</p>
      </form>
    </div>
  );
};

export default Login;
