import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the workplace security policy and terms.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message || "Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message ||
        "Registration failed. Please verify your details or use a different email."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    alert("Google Workspace account creation is currently being provisioned. Please register using your corporate email.");
  };

  return (
    <div className="auth-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="auth-content-box">
        {/* Brand Header */}
        <div className="auth-brand-header">
          <div className="auth-logo-badge">
            <span className="auth-logo-icon">⚡</span>
            <span className="auth-brand-name">StaffPulse</span>
          </div>
          <span className="auth-security-tag">
            <span className="dot" /> Workforce Identity Management
          </span>
        </div>

        {/* Master Auth Glass Card */}
        <div className="auth-card">
          <div className="auth-card-accent signup-accent" />

          {/* Segmented Auth Navigation Switch */}
          <div className="auth-nav-switch">
            <button
              type="button"
              className="auth-switch-btn"
              onClick={() => navigate("/login")}
            >
              🔐 Sign In
            </button>
            <button
              type="button"
              className="auth-switch-btn active"
              onClick={() => navigate("/signup")}
            >
              🚀 Create Account
            </button>
          </div>

          <div className="auth-header-text">
            <h1 className="auth-title">Create Your Account</h1>
            <p className="auth-subtitle">
              Register your verified staff credentials to activate your workplace dashboard access.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="auth-alert-banner error-banner">
              <span className="alert-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Success Banner */}
          {message && (
            <div className="auth-alert-banner success-banner">
              <span className="alert-icon">✅</span>
              <p>{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Field */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-email">
                Corporate Email Address *
              </label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="name@company.com"
                  className="auth-input"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-password">
                Password (min. 6 characters) *
              </label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  placeholder="Create a strong password"
                  className="auth-input"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-confirm-password">
                Confirm Password *
              </label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🛡️</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-confirm-password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className="auth-input"
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Policy Consent Checkbox */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the workplace security protocols & terms</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`auth-submit-btn ${submitting ? "loading" : ""}`}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="auth-spinner" /> Creating Account...
                </>
              ) : (
                "🚀 Complete Registration"
              )}
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span className="auth-divider-line" />
              <span className="auth-divider-text">OR CONTINUE WITH</span>
              <span className="auth-divider-line" />
            </div>

            {/* Google Single Sign-On Button */}
            <button
              type="button"
              className="auth-google-btn"
              onClick={handleGoogleSignup}
            >
              <svg className="google-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </button>

            {/* Bottom Redirect */}
            <div className="auth-footer-redirect">
              <span>Already registered?</span>{" "}
              <Link to="/login" className="auth-redirect-link">
                Sign in to your account ➔
              </Link>
            </div>
          </form>

          {/* Trust Footer */}
          <div className="auth-trust-strip">
            <span>🛡️ 256-bit TLS Encrypted Session • Enterprise SSO Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
