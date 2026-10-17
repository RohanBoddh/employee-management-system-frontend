import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHR = user?.position?.toUpperCase() === "HR" || user?.role?.toLowerCase() === "hr" || user?.role?.toLowerCase() === "admin";

  return (
    <nav className="navbar">
      {/* ── BRAND / LOGO ── */}
      <Link to="/" className="navbar-brand">
        <div className="navbar-brand-icon">⚡</div>
        <span>StaffPulse <span style={{ color: "#818cf8", fontWeight: 400 }}>EMS</span></span>
      </Link>

      {/* ── NAV LINKS ── */}
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>

        {/* Dashboard visible to all logged-in users */}
        {user && (
          <li>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {/* Employees visible only to HR */}
        {user && isHR && (
          <li>
            <NavLink
              to="/Employees"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Staff Directory
            </NavLink>
          </li>
        )}

        {/* Help & Support */}
        <li>
          <NavLink
            to="/help"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Help
          </NavLink>
        </li>

        {/* Login or Avatar Dropdown */}
        {!user ? (
          <li className="avatar-wrapper" style={{ marginLeft: "auto" }}>
            <Link to="/Login" className="user-avatar login-avatar" title="Sign In">
              <span className="login-letter">Sign In</span>
            </Link>
          </li>
        ) : (
          <li className="avatar-wrapper" ref={dropdownRef} style={{ marginLeft: "auto" }}>
            <div
              className="user-avatar"
              onClick={() => setOpen(!open)}
              title={user.name || user.email}
            >
              {firstLetter}
            </div>

            {open && (
              <div className="profile-dropdown">
                <p className="name">{user.name || "Employee"}</p>
                <p className="email">{user.email}</p>
                <hr />
                <button onClick={handleLogout}>🚪 Sign Out</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
