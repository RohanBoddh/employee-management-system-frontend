import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // 🔹 POST request to backend
      const response = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message); // "Signup successful ✅"

      // Redirect to login after 1s
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed ❌");
    }
  };

  // 🔵 GOOGLE SIGNUP (DEMO)
  const handleGoogleSignup = async () => {
    alert("Google Signup is currently unavailable. Backend integration is pending.");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p className="subtitle">Create your account</p>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 🔐 PASSWORD WITH EYE */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="login-btn">
          Sign Up
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignup}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Sign up with Google
        </button>

        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
