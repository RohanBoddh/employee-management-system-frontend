import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, BACKEND_URL } from "../services/api";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Components/Loader";
import "./HREmployees.css";

const HREmployees = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [hrStaff, setHrStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    // Role protection
    const position = user?.position?.toUpperCase();
    const role = user?.role?.toUpperCase();

    if (!user || (position !== "HR" && role !== "ADMIN")) {
      const stored = JSON.parse(sessionStorage.getItem("user") || "null");
      const storedPos = stored?.position?.toUpperCase();
      const storedRole = stored?.role?.toUpperCase();

      if (storedPos !== "HR" && storedRole !== "ADMIN") {
        alert("Access restricted: Only HR administrators can view HR Headcount details.");
        navigate("/hr-attendance-dashboard");
        return;
      }
    }

    fetchHRStaff();
  }, [user, navigate]);

  const fetchHRStaff = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/employees`);
      if (Array.isArray(res.data)) {
        // Filter strictly by HR position or role
        const hrOnly = res.data.filter(
          (emp) =>
            emp.position?.toUpperCase() === "HR" ||
            emp.role?.toUpperCase() === "HR"
        );
        // Fallback to employees with HR or sample if database only has 1
        setHrStaff(hrOnly.length > 0 ? hrOnly : res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("HR Headcount fetch error:", err);
      setLoading(false);
    }
  };

  const copyToClipboard = (email) => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const markAttendance = async (employeeId, status) => {
    setActionLoading(employeeId);
    try {
      await axios.post(`${BACKEND_URL}/attendance/mark`, {
        employeeId,
        status,
      });
      alert(`✅ Attendance marked as ${status}`);
    } catch (err) {
      console.error("Attendance mark error:", err);
      alert("❌ Attendance mark failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <Loader />;

  const filteredStaff = hrStaff.filter((emp) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.phone?.includes(term) ||
      emp.address?.toLowerCase().includes(term)
    );
  });

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="hr-headcount-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="hr-headcount-content-wrapper">
        {/* ── 1. WELCOME HERO BANNER ── */}
        <section className="hrh-hero-card">
          <div className="hrh-hero-accent-strip" />
          <div className="hrh-hero-main">
            <div className="hrh-hero-avatar-box">
              <div className="hrh-hero-avatar">👥</div>
              <span className="hrh-online-pulse" title="HR Division Online" />
            </div>

            <div className="hrh-hero-info">
              <div className="hrh-badge-row">
                <span className="hrh-status-pill">
                  <span className="dot" /> Human Resources Administration
                </span>
                <span className="hrh-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="hrh-hero-title">
                HR Headcount & <span className="hrh-hero-highlight">Personnel Dossier</span>
              </h1>
              <p className="hrh-hero-subtitle">
                Complete credentials, contact files, compensation tier, and active shift records of the HR team.
              </p>
            </div>

            <div className="hrh-hero-actions">
              <Link to="/hr-attendance-dashboard" className="hrh-secondary-btn">
                ← Back to Attendance Hub
              </Link>
              <Link to="/AddEmployee" className="hrh-cta-btn">
                + Add HR Officer
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE KPI METRIC CARDS ── */}
        <section className="hrh-metrics-grid">
          <div className="hrh-metric-card">
            <div className="hrh-metric-icon blue-kpi">👥</div>
            <div className="hrh-metric-content">
              <span className="hrh-metric-title">HR Headcount</span>
              <h3 className="hrh-metric-value">{hrStaff.length}</h3>
              <span className="hrh-metric-subtext">Verified Personnel</span>
            </div>
          </div>

          <div className="hrh-metric-card">
            <div className="hrh-metric-icon cyan-kpi">🏢</div>
            <div className="hrh-metric-content">
              <span className="hrh-metric-title">Department Unit</span>
              <h3 className="hrh-metric-value">Human Resources</h3>
              <span className="hrh-metric-subtext">Talent & Operations</span>
            </div>
          </div>

          <div className="hrh-metric-card">
            <div className="hrh-metric-icon purple-kpi">🛡️</div>
            <div className="hrh-metric-content">
              <span className="hrh-metric-title">Access Clearance</span>
              <h3 className="hrh-metric-value">Executive Admin</h3>
              <span className="hrh-metric-subtext">Full Platform Privileges</span>
            </div>
          </div>

          <div className="hrh-metric-card">
            <div className="hrh-metric-icon green-kpi">⚡</div>
            <div className="hrh-metric-content">
              <span className="hrh-metric-title">Operational Shift</span>
              <h3 className="hrh-metric-value">Active Duty</h3>
              <span className="hrh-metric-subtext text-success">Live Attendance Enabled</span>
            </div>
          </div>
        </section>

        {/* ── 3. SEARCH & FILTER CONTROLS ── */}
        <section className="hrh-search-bar-row">
          <div className="hrh-search-box">
            <span className="hrh-search-ic">🔍</span>
            <input
              type="text"
              className="hrh-search-input"
              placeholder="Search HR personnel by name, email, phone, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="hrh-clear-search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="hrh-count-badge">
            Showing <b>{filteredStaff.length}</b> of <b>{hrStaff.length}</b> HR staff
          </div>
        </section>

        {/* ── 4. HR PERSONNEL DOSSIER CARDS GRID ── */}
        <section className="hrh-cards-grid">
          {filteredStaff.length === 0 ? (
            <div className="hrh-empty-state">
              <span className="empty-ic">📂</span>
              <h3>No HR Personnel Found</h3>
              <p>No records match your query. Try resetting your search filter.</p>
              {searchTerm && (
                <button
                  className="hrh-reset-btn"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search Filter
                </button>
              )}
            </div>
          ) : (
            filteredStaff.map((emp) => {
              const empId = emp.id || emp._id;
              const firstLetter = emp.name
                ? emp.name.charAt(0).toUpperCase()
                : "H";
              const formattedSalary = emp.salary
                ? `₹${Number(emp.salary).toLocaleString()}`
                : "Confidential";
              const joinedDate = emp.createdAt
                ? emp.createdAt.slice(0, 10)
                : "Active Officer";

              return (
                <div key={empId} className="hrh-card">
                  {/* Card Header */}
                  <div className="hrh-card-header">
                    <div className="hrh-avatar-wrap">
                      <div className="hrh-card-avatar">{firstLetter}</div>
                      <span className="hrh-card-online-dot" />
                    </div>
                    <div className="hrh-card-headline">
                      <h3 className="hrh-card-name">{emp.name}</h3>
                      <span className="hrh-role-tag">
                        <span>🛡️</span> HR Administrator
                      </span>
                    </div>
                  </div>

                  {/* Details Dossier Rows */}
                  <div className="hrh-dossier-list">
                    {/* Email */}
                    <div className="hrh-dossier-row">
                      <span className="hrh-dossier-label">
                        <span className="ic">✉️</span> Corporate Email
                      </span>
                      <div className="hrh-dossier-action-wrap">
                        <span className="hrh-dossier-val" title={emp.email}>
                          {emp.email}
                        </span>
                        <button
                          className="hrh-copy-btn"
                          onClick={() => copyToClipboard(emp.email)}
                          title="Copy Email"
                        >
                          {copiedEmail === emp.email ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="hrh-dossier-row">
                      <span className="hrh-dossier-label">
                        <span className="ic">📱</span> Direct Phone
                      </span>
                      <span className="hrh-dossier-val">
                        {emp.phone || "Not Disclosed"}
                      </span>
                    </div>

                    {/* Address / Branch */}
                    <div className="hrh-dossier-row">
                      <span className="hrh-dossier-label">
                        <span className="ic">📍</span> Work Location
                      </span>
                      <span className="hrh-dossier-val">
                        {emp.address || "Headquarters Tower 1"}
                      </span>
                    </div>

                    {/* Salary */}
                    <div className="hrh-dossier-row">
                      <span className="hrh-dossier-label">
                        <span className="ic">💰</span> Compensation Tier
                      </span>
                      <span className="hrh-dossier-val highlight-salary">
                        {formattedSalary}
                      </span>
                    </div>

                    {/* Member Since */}
                    <div className="hrh-dossier-row">
                      <span className="hrh-dossier-label">
                        <span className="ic">🗓️</span> Registration Date
                      </span>
                      <span className="hrh-dossier-val">{joinedDate}</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="hrh-card-footer">
                    <Link
                      to={`/edit-employee/${empId}`}
                      className="hrh-edit-link"
                    >
                      ✏️ Edit Record
                    </Link>

                    <div className="hrh-attendance-btns">
                      <button
                        className="hrh-btn-att present"
                        onClick={() => markAttendance(empId, "Present")}
                        disabled={actionLoading === empId}
                        title="Mark Present Today"
                      >
                        ✓ Present
                      </button>
                      <button
                        className="hrh-btn-att absent"
                        onClick={() => markAttendance(empId, "Absent")}
                        disabled={actionLoading === empId}
                        title="Mark Absent Today"
                      >
                        ✕ Absent
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
};

export default HREmployees;
