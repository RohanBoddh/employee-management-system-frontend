import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeservice";
import EmployeeCard from "../Components/EmployeeCard";
import Loader from "../Components/Loader";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { API_BASE_URL } from "../services/api";
import "./Employees.css";
import hrAttendanceImg from "../Pages/images/hr-attendance.png";

const Employees = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const roleUpper = (user?.role || user?.position || "").toUpperCase();
  const isAdmin = roleUpper === "ADMIN" || roleUpper === "ADMINISTRATOR" || roleUpper === "HR ADMIN";

  const [employees, setEmployees] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showEmployees, setShowEmployees] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Graceful check for HR or Admin access
    const stored = JSON.parse(sessionStorage.getItem("user") || "null");
    const active = user || stored;

    if (!active) {
      navigate("/Login");
      return;
    }

    const pos = (active.position || "").toUpperCase();
    const role = (active.role || "").toUpperCase();
    const isHRorAdmin =
      pos === "ADMIN" ||
      role === "ADMIN" ||
      pos === "HR" ||
      role === "HR" ||
      pos.includes("HR") ||
      role.includes("HR");

    if (!isHRorAdmin) {
      alert("Access restricted: Only HR and Admin administrators can access the Employee Directory.");
      navigate("/dashboard");
      return;
    }

    const fetchData = async () => {
      try {
        const empRes = await getEmployees();
        setEmployees(Array.isArray(empRes?.data) ? empRes.data : []);

        const reportRes = await fetch(`${API_BASE_URL}/support/all-reports`);
        if (reportRes.ok) {
          const reportData = await reportRes.json();
          setReports(Array.isArray(reportData) ? reportData : []);
        }
        setLoading(false);
      } catch (err) {
        console.error("Directory fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(async () => {
      try {
        const reportRes = await fetch(`${API_BASE_URL}/support/all-reports`);
        if (reportRes.ok) {
          const reportData = await reportRes.json();
          setReports(Array.isArray(reportData) ? reportData : []);
        }
      } catch (err) {
        console.error("Auto-sync error:", err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  if (loading) return <Loader />;

  const filteredEmployees = employees.filter((emp) => {
    const matchesDept =
      !selectedDepartment ||
      emp.position?.toLowerCase() === selectedDepartment.toLowerCase();

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      emp.name?.toLowerCase().includes(searchLower) ||
      emp.phone?.includes(searchTerm) ||
      emp.email?.toLowerCase().includes(searchLower);

    return matchesDept && matchesSearch;
  });

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="employees-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="employees-content-wrapper">
        {/* ── 1. WELCOME HERO BANNER (DASHBOARD STYLE) ── */}
        <section className="emp-hero-card">
          <div className="emp-hero-accent-strip" />
          <div className="emp-hero-main">
            <div className="emp-hero-avatar-box">
              <div className="emp-hero-avatar">👥</div>
              <span className="emp-online-pulse" title="System Live" />
            </div>

            <div className="emp-hero-info">
              <div className="emp-badge-row">
                <span className="emp-status-pill">
                  <span className="dot" /> HR Workforce Portal
                </span>
                <span className="emp-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="emp-hero-title">
                Staff Directory & <span className="emp-hero-highlight">Personnel Records</span>
              </h1>
              <p className="emp-hero-subtitle">
                Search, filter departments, record real-time attendance, and manage corporate workforce.
              </p>
            </div>

            <div className="emp-hero-actions">
              <Link to="/AddEmployee" className="emp-cta-btn">
                <span className="btn-icon">+</span> Add New Employee
              </Link>
              <Link to="/hr-attendance-dashboard" className="emp-secondary-btn">
                📊 Attendance Hub
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE KPI METRIC CARDS ── */}
        <section className="emp-metrics-grid">
          {/* Total Employees */}
          <div className="emp-metric-card">
            <div className="emp-metric-icon blue-kpi">👥</div>
            <div className="emp-metric-content">
              <span className="emp-metric-title">Total Headcount</span>
              <h3 className="emp-metric-value">{employees.length}</h3>
              <span className="emp-metric-subtext">Active Personnel Registered</span>
            </div>
          </div>

          {/* Department Filter Card */}
          <div className="emp-metric-card filter-card">
            <div className="emp-metric-icon cyan-kpi">🏢</div>
            <div className="emp-metric-content full-width">
              <span className="emp-metric-title">Department Filter</span>
              <select
                className="emp-dept-select"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setShowEmployees(true);
                }}
              >
                <option value="">All Departments</option>
                <option value="HR">HR & Talent</option>
                <option value="IT">IT & Engineering</option>
                <option value="Finance">Finance & Accounting</option>
                <option value="Marketing">Marketing & Comms</option>
                <option value="Sales">Sales & Growth</option>
              </select>
            </div>
          </div>

          {/* Support Inquiries Card (Admin Only) */}
          <div
            className={`emp-metric-card clickable-kpi ${!isAdmin ? "locked-kpi" : ""}`}
            onClick={() => {
              if (isAdmin) {
                navigate("/reports");
              } else {
                alert("Access Restricted: Support & HR Reports are only accessible by System Administrators (Admin). You can switch your role to Admin on your Dashboard to view reports.");
              }
            }}
            title={isAdmin ? "Click to view all Support Inquiries" : "Restricted to System Administrators (Admin)"}
          >
            <div className="emp-metric-icon purple-kpi">🎧</div>
            <div className="emp-metric-content">
              <span className="emp-metric-title">Support Inquiries</span>
              <h3 className="emp-metric-value">{reports.length}</h3>
              <span className="emp-metric-subtext">
                {isAdmin ? "Open Grievance Tickets ↗" : "Admin Only Access 🔒"}
              </span>
            </div>
          </div>

          {/* Quick Visibility Toggle Card */}
          <div className="emp-metric-card">
            <div className="emp-metric-icon green-kpi">⚡</div>
            <div className="emp-metric-content">
              <span className="emp-metric-title">Display Status</span>
              <button
                className="emp-toggle-btn"
                onClick={() => setShowEmployees((prev) => !prev)}
              >
                {showEmployees ? "Hide Directory" : "Show Directory"}
              </button>
              <span className="emp-metric-subtext">
                {filteredEmployees.length} matching criteria
              </span>
            </div>
          </div>
        </section>

        {/* ── 3. LIVE SEARCH & FILTER CONTROLS ── */}
        {showEmployees && (
          <section className="emp-search-container">
            <div className="emp-search-inner">
              <span className="emp-search-icon">🔍</span>
              <input
                type="text"
                className="emp-search-input"
                placeholder="Search staff by full name, phone number, or corporate email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="emp-clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="emp-results-pill">
              Showing <b>{filteredEmployees.length}</b> of <b>{employees.length}</b> staff
            </div>
          </section>
        )}

        {/* ── 4. EMPLOYEE DIRECTORY CARDS GRID ── */}
        {showEmployees && (
          <section className="emp-directory-grid">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.id || emp._id}
                  employee={emp}
                  onAttendanceMarked={() => {}}
                />
              ))
            ) : (
              <div className="emp-no-results">
                <span className="empty-emoji">📂</span>
                <h3>No Employees Match Your Criteria</h3>
                <p>Try modifying your search term or select "All Departments".</p>
                <button
                  className="emp-reset-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment("");
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── 5. RELATED ENTERPRISE DASHBOARDS ── */}
        <section className="emp-explore-section">
          <div className="emp-explore-header">
            <h3>Explore HR Intelligence Dashboards</h3>
            <p>Access high-level analytics, shift compliance, and workforce reports.</p>
          </div>

          <div className="emp-explore-grid">
            <div className="emp-explore-card">
              <div className="emp-explore-img-wrap">
                <img
                  src={hrAttendanceImg}
                  alt="HR Attendance Analytics"
                  className="emp-explore-img"
                />
                <span className="emp-explore-badge">HR Intelligence</span>
              </div>
              <div className="emp-explore-content">
                <h4>HR Employee Attendance & Insights Portal</h4>
                <p>
                  Analyze workforce presence rates, absenteeism patterns, and department logs with one-click exports.
                </p>
                <button
                  className="emp-explore-cta"
                  onClick={() => navigate("/hr-attendance-dashboard")}
                >
                  Launch Attendance Portal →
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Employees;
