import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, API_BASE_URL } from "../services/api";
import "./HRAttendanceDashboard.css";
import HRAnalytics from "../Components/HRAnalytics";

const HRAttendanceDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalHR: 0,
    presentToday: 0,
    absentToday: 0,
    absenteeRate: 0,
  });

  const [hrEmployees, setHrEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [markedMap, setMarkedMap] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  // 🔄 Fetch HR stats
  const fetchHRStats = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/stats/hr`);
      if (res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("HR stats fetch error:", err);
    }
  };

  // 👥 Fetch HR employees
  const fetchHREmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/employees`);
      if (Array.isArray(res.data)) {
        const hrOnly = res.data.filter(
          (emp) => emp.position?.toUpperCase() === "HR"
        );
        setHrEmployees(hrOnly.length > 0 ? hrOnly : res.data.slice(0, 8)); // fallback to staff if position not strictly HR
      }
    } catch (err) {
      console.error("HR employees fetch error:", err);
    }
  };

  // ✅ Mark attendance
  const markAttendance = async (employeeId, status) => {
    setActionLoading(employeeId);
    try {
      await axios.post(`${BACKEND_URL}/attendance/mark`, {
        employeeId,
        status,
      });

      setMarkedMap((prev) => ({
        ...prev,
        [employeeId]: status,
      }));

      await fetchHRStats(); // refresh stats in real time
    } catch (err) {
      console.error("Attendance marking error:", err);
      alert("Failed to mark attendance. Please verify network connectivity.");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchHRStats();
    fetchHREmployees();

    const interval = setInterval(() => {
      fetchHRStats();
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const filteredHREmployees = hrEmployees.filter((emp) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.phone?.includes(term)
    );
  });

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="attendance-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="attendance-content-wrapper">
        {/* ── 1. WELCOME HERO BANNER ── */}
        <section className="att-hero-card">
          <div className="att-hero-accent-strip" />
          <div className="att-hero-main">
            <div className="att-hero-avatar-box">
              <div className="att-hero-avatar">⏱️</div>
              <span className="att-online-pulse" title="Roster Live" />
            </div>

            <div className="att-hero-info">
              <div className="att-badge-row">
                <span className="att-status-pill">
                  <span className="dot" /> HR Shift Operations
                </span>
                <span className="att-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="att-hero-title">
                Workforce Attendance & <span className="att-hero-highlight">Shift Intelligence</span>
              </h1>
              <p className="att-hero-subtitle">
                Real-time roster compliance, employee attendance verification, and automated analytics.
              </p>
            </div>

            <div className="att-hero-actions">
              <Link to="/employees" className="att-cta-btn">
                👥 Staff Directory
              </Link>
              <Link to="/reports" className="att-secondary-btn">
                📋 Support Reports
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE KPI METRIC CARDS ── */}
        <section className="att-metrics-grid">
          {/* Total HR */}
          <div className="att-metric-card">
            <div className="att-metric-icon blue-kpi">👥</div>
            <div className="att-metric-content">
              <span className="att-metric-title">HR Headcount</span>
              <h3 className="att-metric-value">{stats.totalHR}</h3>
              <span className="att-metric-subtext">Registered HR Officers</span>
            </div>
          </div>

          {/* Present Today (Clickable) */}
          <div
            className="att-metric-card clickable-kpi"
            onClick={() => navigate("/hr/present")}
            title="Click to view all Present personnel"
          >
            <div className="att-metric-icon green-kpi">✓</div>
            <div className="att-metric-content">
              <span className="att-metric-title">Present Today</span>
              <h3 className="att-metric-value">{stats.presentToday}</h3>
              <span className="att-metric-subtext text-success">Verified On-Duty ↗</span>
            </div>
          </div>

          {/* Absent Today (Clickable) */}
          <div
            className="att-metric-card clickable-kpi"
            onClick={() => navigate("/hr/absent")}
            title="Click to view Absent personnel"
          >
            <div className="att-metric-icon red-kpi">✕</div>
            <div className="att-metric-content">
              <span className="att-metric-title">Absent Today</span>
              <h3 className="att-metric-value">{stats.absentToday}</h3>
              <span className="att-metric-subtext text-danger">Off-Duty / Leave ↗</span>
            </div>
          </div>

          {/* Absentee Rate */}
          <div className="att-metric-card">
            <div className="att-metric-icon purple-kpi">📉</div>
            <div className="att-metric-content">
              <span className="att-metric-title">Absentee Rate</span>
              <h3 className="att-metric-value">{stats.absenteeRate}%</h3>
              <span className="att-metric-subtext">Overall Shift Deficit</span>
            </div>
          </div>
        </section>

        {/* ── 3. VISUAL ANALYTICS & CHARTS SECTION ── */}
        <section className="att-analytics-wrapper">
          <HRAnalytics stats={stats} />
        </section>

        {/* ── 4. HR ATTENDANCE MARKING SECTION ── */}
        <section className="att-roster-section">
          <div className="att-roster-header">
            <div>
              <h3 className="att-roster-title">HR Department Roster Verification</h3>
              <p className="att-roster-desc">
                Mark, update, or audit presence records for personnel on shift today.
              </p>
            </div>

            <div className="att-roster-search">
              <span className="att-search-ic">🔍</span>
              <input
                type="text"
                className="att-search-input"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="att-clear-btn"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {filteredHREmployees.length === 0 ? (
            <div className="att-no-staff">
              <span className="empty-ic">📂</span>
              <h4>No HR personnel found</h4>
              <p>Add staff in the directory or clear your search query.</p>
            </div>
          ) : (
            <div className="att-roster-list">
              {filteredHREmployees.map((emp) => {
                const empId = emp.id || emp._id;
                const currentStatus = markedMap[empId];
                const firstLetter = emp.name ? emp.name.charAt(0).toUpperCase() : "H";

                return (
                  <div key={empId} className="att-roster-row">
                    <div className="att-row-left">
                      <div className="att-row-avatar">{firstLetter}</div>
                      <div className="att-row-details">
                        <span className="att-row-name">{emp.name}</span>
                        <div className="att-row-sub">
                          <span className="att-dept-tag">HR Division</span>
                          {emp.email && <span className="att-email-text">{emp.email}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="att-row-actions">
                      {currentStatus && (
                        <span
                          className={`att-status-badge ${
                            currentStatus === "Present" ? "present-badge" : "absent-badge"
                          }`}
                        >
                          {currentStatus === "Present" ? "✓ Marked Present" : "✕ Marked Absent"}
                        </span>
                      )}

                      <button
                        className={`att-mark-btn present-btn ${
                          actionLoading === empId ? "loading" : ""
                        }`}
                        onClick={() => markAttendance(empId, "Present")}
                        disabled={actionLoading === empId}
                      >
                        ✓ Present
                      </button>

                      <button
                        className={`att-mark-btn absent-btn ${
                          actionLoading === empId ? "loading" : ""
                        }`}
                        onClick={() => markAttendance(empId, "Absent")}
                        disabled={actionLoading === empId}
                      >
                        ✕ Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HRAttendanceDashboard;
