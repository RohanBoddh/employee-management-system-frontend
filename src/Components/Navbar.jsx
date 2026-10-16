import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "";

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

  return (
    <nav className="navbar">
      {/* <h1>Employee Management</h1> */}

      <ul>
        {/* Home always visible */}
        <li>
          <NavLink
            to="/Home"
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
        {user && user.position === "HR" && (
          <li>
            <NavLink
              to="/Employees"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Employees
            </NavLink>
          </li>
        )}

        {/* Login or Avatar */}
        {!user ? (
          <li className="avatar-wrapper">
            <Link to="/Login" className="user-avatar login-avatar">
              <span className="login-letter">Login</span>
            </Link>
          </li>
        ) : (
          <li className="avatar-wrapper" ref={dropdownRef}>
            <div className="user-avatar" onClick={() => setOpen(!open)}>
              {firstLetter}
            </div>

            {open && (
              <div className="profile-dropdown">
                <p className="name">{user.name}</p>
                <p className="email">{user.email}</p>
                <hr />
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
