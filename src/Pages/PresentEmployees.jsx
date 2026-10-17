import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../services/api";
import "./AttendanceList.css";

const PresentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/stats/employees/present`)
      .then((res) => {
        setEmployees(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching present employees:", err);
        setEmployees([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const filtered = employees.filter((emp) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.position?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="att-list-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="att-list-wrapper">
        {/* ── TOP NAV ── */}
        <div className="att-list-nav">
          <Link to="/hr-attendance-dashboard" className="att-back-link">
            ← Back to Attendance Hub
          </Link>
          <span className="att-date-badge">🗓️ {todayDate}</span>
        </div>

        {/* ── HERO HEADER ── */}
        <div className="att-list-hero-card">
          <div className="att-list-accent green-strip" />
          <div className="att-list-hero-inner">
            <div className="att-list-hero-info">
              <div className="att-list-badge green-badge">
                <span className="live-dot" /> Verified On-Duty
              </div>
              <h1 className="att-list-title">
                Present Staff <span className="att-highlight green-highlight">Roster</span>
              </h1>
              <p className="att-list-desc">
                Personnel confirmed present for today's active shift and verified via attendance log.
              </p>
            </div>

            <div className="att-list-stat-box green-stat">
              <span className="att-stat-label">On-Duty Count</span>
              <span className="att-stat-num">{employees.length}</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="att-list-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Filter present personnel by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── ROSTER GRID ── */}
        {loading ? (
          <div className="att-list-loading">
            <div className="spinner" />
            <p>Retrieving verified on-duty personnel...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="att-list-empty-card">
            <div className="empty-icon">📋</div>
            <h3>No employees verified present</h3>
            <p>
              {searchTerm
                ? "No matching staff found for your search term."
                : "No personnel have logged in or been marked present yet today."}
            </p>
            <Link to="/hr-attendance-dashboard" className="att-hub-btn">
              Open Attendance Hub
            </Link>
          </div>
        ) : (
          <div className="att-list-cards-grid">
            {filtered.map((emp) => {
              const initial = emp.name ? emp.name.charAt(0).toUpperCase() : "E";
              return (
                <div key={emp.id || emp._id} className="att-person-card present-card">
                  <div className="card-top-row">
                    <div className="avatar-chip green-chip">{initial}</div>
                    <span className="status-tag tag-present">✓ On Duty</span>
                  </div>

                  <div className="card-body-content">
                    <h3 className="person-name">{emp.name}</h3>
                    <p className="person-role">{emp.position || "Staff Associate"}</p>
                    <p className="person-email" title={emp.email}>
                      ✉️ {emp.email}
                    </p>
                  </div>

                  <div className="card-footer-row">
                    <span className="meta-info">Verified Today</span>
                    <span className="shift-badge">Shift A</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentEmployees;
