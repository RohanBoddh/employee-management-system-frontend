import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Login.css";
import EyeIcon from "../assets/eye.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // 🔹 Auto-redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.position === "HR")
        navigate("/Dashboard"); // HR goes to Dashboard (can access Employees later)
      else navigate("/Dashboard"); // Non-HR also goes to Dashboard
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedUser = await login(email, password);

      // Redirect based on position
      if (loggedUser.position === "HR")
        navigate("/Dashboard"); // HR
      else navigate("/Dashboard"); // Non-HR
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          id="email" // ✅ Add this
          name="email" // ✅ Add this
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD WITH EYE IMAGE */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={EyeIcon}
            alt="Toggle password visibility"
            className="eye-icon-img"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <p className="forgot-link" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>

        <button type="submit" className="login-btn">
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="signup-link">
          Don’t have an account?{" "}
          <span
            className="signup-link-text"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
