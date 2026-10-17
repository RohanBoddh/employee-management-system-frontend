import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle outside click for avatar dropdown and mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".mobile-toggle-btn")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    setMobileMenuOpen(false);
    navigate("/", { replace: true });
  };

  const isHR =
    user?.position?.toUpperCase() === "HR" ||
    user?.role?.toLowerCase() === "hr" ||
    user?.role?.toLowerCase() === "admin";

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "U");

  return (
    <header className="navbar-header">
      <nav className="navbar">
        {/* ── 1. BRAND / LOGO ── */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">⚡</div>
          <div className="navbar-brand-text">
            StaffPulse <span className="brand-accent">EMS</span>
          </div>
        </Link>

        {/* ── 2. DESKTOP NAVIGATION LINKS ── */}
        <ul className="nav-links desktop-only">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Home
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Dashboard
              </NavLink>
            </li>
          )}

          {user && isHR && (
            <>
              <li>
                <NavLink
                  to="/employees"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Directory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hr-attendance-dashboard"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Attendance
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Reports
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/help"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Help
            </NavLink>
          </li>
        </ul>

        {/* ── 3. RIGHT CONTROLS (Theme, Auth, Mobile toggle) ── */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Blue Mode"}
            aria-label="Toggle Theme"
          >
            <span className="theme-toggle-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          {/* User Auth Buttons or Avatar Dropdown */}
          {!user ? (
            <div className="auth-btns desktop-only">
              <Link to="/login" className="btn-signin">
                Sign In
              </Link>
              <Link to="/signup" className="btn-getstarted">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="avatar-wrapper" ref={dropdownRef}>
              <button
                className="user-avatar-btn"
                onClick={() => setOpen(!open)}
                title={user.name || user.email}
                aria-label="User Account Menu"
              >
                <div className="user-avatar">{firstLetter}</div>
                <span className="avatar-status-dot"></span>
              </button>

              {open && (
                <div className="profile-dropdown">
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar">{firstLetter}</div>
                    <div className="dropdown-user-details">
                      <p className="dropdown-name">{user.name || "Employee"}</p>
                      <p className="dropdown-email">{user.email}</p>
                      <span className={`dropdown-role-badge ${isHR ? "role-hr" : "role-emp"}`}>
                        {isHR ? "HR Admin" : "Employee"}
                      </span>
                    </div>
                  </div>

                  <hr className="dropdown-divider" />

                  <div className="dropdown-links">
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setOpen(false)}
                    >
                      <span className="dropdown-item-icon">👤</span> My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setOpen(false)}
                    >
                      <span className="dropdown-item-icon">📊</span> Dashboard
                    </Link>
                    {isHR && (
                      <Link
                        to="/employees"
                        className="dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <span className="dropdown-item-icon">👥</span> Staff Directory
                      </Link>
                    )}
                  </div>

                  <hr className="dropdown-divider" />

                  <button className="dropdown-logout-btn" onClick={handleLogout}>
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── 4. MOBILE HAMBURGER BUTTON ── */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </nav>

      {/* ── 5. MOBILE DRAWER MENU ── */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" ref={mobileMenuRef}>
          <div className="mobile-menu-inner">
            {user && (
              <div className="mobile-user-card">
                <div className="mobile-avatar">{firstLetter}</div>
                <div className="mobile-user-info">
                  <p className="mobile-user-name">{user.name || "Employee"}</p>
                  <p className="mobile-user-email">{user.email}</p>
                  <span className={`dropdown-role-badge ${isHR ? "role-hr" : "role-emp"}`}>
                    {isHR ? "HR Admin" : "Employee"}
                  </span>
                </div>
              </div>
            )}

            <ul className="mobile-nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mob-icon">🏠</span> Home
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mob-icon">📊</span> Dashboard
                  </NavLink>
                </li>
              )}

              {user && isHR && (
                <>
                  <li>
                    <NavLink
                      to="/employees"
                      className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mob-icon">👥</span> Staff Directory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/hr-attendance-dashboard"
                      className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mob-icon">📅</span> Attendance Dashboard
                    </NavLink>
                  </li>
                </>
              )}

              {user && (
                <>
                  <li>
                    <NavLink
                      to="/reports"
                      className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mob-icon">📋</span> Reports
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mob-icon">👤</span> My Profile
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink
                  to="/help"
                  className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mob-icon">🛎️</span> Help & Support
                </NavLink>
              </li>
            </ul>

            <div className="mobile-menu-footer">
              {!user ? (
                <div className="mobile-auth-actions">
                  <Link
                    to="/login"
                    className="mobile-btn-signin"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="mobile-btn-signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </div>
              ) : (
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  🚪 Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
