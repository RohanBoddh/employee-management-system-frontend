import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../services/api";
import "./AttendanceList.css";

const AbsentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/stats/employees/absent`)
      .then((res) => {
        setEmployees(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching absent employees:", err);
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
          <div className="att-list-accent rose-strip" />
          <div className="att-list-hero-inner">
            <div className="att-list-hero-info">
              <div className="att-list-badge rose-badge">
                <span className="live-dot red-dot" /> Off-Duty / Absence Notice
              </div>
              <h1 className="att-list-title">
                Absent Personnel <span className="att-highlight rose-highlight">Record</span>
              </h1>
              <p className="att-list-desc">
                Personnel logged as absent or not checked in for today's active operational schedule.
              </p>
            </div>

            <div className="att-list-stat-box rose-stat">
              <span className="att-stat-label">Absentee Count</span>
              <span className="att-stat-num">{employees.length}</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="att-list-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Filter absent personnel by name, email, or department..."
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
            <p>Retrieving absent personnel logs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="att-list-empty-card">
            <div className="empty-icon">🎉</div>
            <h3>Zero Absentees Reported</h3>
            <p>
              {searchTerm
                ? "No matching absent staff found for your query."
                : "Full team attendance today! No personnel are marked as absent."}
            </p>
            <Link to="/hr-attendance-dashboard" className="att-hub-btn">
              Return to Attendance Hub
            </Link>
          </div>
        ) : (
          <div className="att-list-cards-grid">
            {filtered.map((emp) => {
              const initial = emp.name ? emp.name.charAt(0).toUpperCase() : "E";
              return (
                <div key={emp.id || emp._id} className="att-person-card absent-card">
                  <div className="card-top-row">
                    <div className="avatar-chip rose-chip">{initial}</div>
                    <span className="status-tag tag-absent">✕ Absent</span>
                  </div>

                  <div className="card-body-content">
                    <h3 className="person-name">{emp.name}</h3>
                    <p className="person-role">{emp.position || "Staff Associate"}</p>
                    <p className="person-email" title={emp.email}>
                      ✉️ {emp.email}
                    </p>
                  </div>

                  <div className="card-footer-row">
                    <span className="meta-info text-danger">Unexcused / Leave</span>
                    <span className="shift-badge absent-shift">Not Present</span>
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

export default AbsentEmployees;
