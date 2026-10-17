import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { API_BASE_URL } from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [roleChangeNotice, setRoleChangeNotice] = useState("");
  const { updateUserRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      setUser({
        name: "Guest Employee",
        email: "demo@company.com",
        phone: "+91 98765 43210",
        address: "HQ Suite 400",
        department: "Human Resources",
        position: "HR",
        role: "hr",
        joiningDate: new Date().toISOString().slice(0, 10),
      });
      return;
    }

    fetch(`${API_BASE_URL}/employees/email/${storedUser.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Employee not found");
        return res.json();
      })
      .then((data) => {
        setUser({
          name: data.name || storedUser.name || "Employee",
          email: data.email || storedUser.email,
          phone: data.phone || "Not Specified",
          address: data.address || "Headquarters Tower 1",
          department: data.position || storedUser.position || "Operations",
          position: data.position || storedUser.position || "Staff",
          role: storedUser.role || (data.position?.toUpperCase() === "ADMIN" ? "admin" : (data.position?.toUpperCase() === "HR" ? "hr" : "employee")),
          joiningDate: data.createdAt ? data.createdAt.slice(0, 10) : "2026-01-15",
        });
      })
      .catch((err) => {
        console.warn("Using stored user fallback:", err.message);
        setUser({
          name: storedUser.name || "Employee",
          email: storedUser.email,
          phone: "Not Specified",
          address: "Headquarters Tower 1",
          department: storedUser.position || "Operations",
          position: storedUser.position || "Staff",
          role: storedUser.role || (storedUser.position?.toUpperCase() === "ADMIN" ? "admin" : (storedUser.position?.toUpperCase() === "HR" ? "hr" : "employee")),
          joiningDate: "2026-01-15",
        });
      });
  }, []);

  const copyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRoleChange = async (newRole) => {
    try {
      if (updateUserRole) {
        await updateUserRole(newRole);
      }
      setUser((prev) => ({
        ...prev,
        position: newRole,
        department: newRole === "HR" || newRole === "ADMIN" ? "Human Resources" : prev.department,
        role: newRole.toLowerCase(),
      }));

      setRoleChangeNotice(
        `Role successfully switched to "${newRole}". Notice: This temporary access is provided for full website exploration and can be revoked by the administrator at any time.`
      );

      setTimeout(() => {
        setRoleChangeNotice("");
      }, 6000);
    } catch (err) {
      console.error("Failed to switch role:", err);
    }
  };

  if (!user) {
    return (
      <div className="dashboard-page-container">
        <div className="dash-loading-card">
          <div className="dash-loading-spinner" />
          <h2>Loading Workspace...</h2>
          <p>Fetching your workplace credentials</p>
        </div>
      </div>
    );
  }

  const roleUpper = (user.position || user.role || "").toUpperCase();
  const isAdmin = roleUpper === "ADMIN" || roleUpper === "ADMINISTRATOR" || roleUpper === "HR ADMIN";
  const isHR = roleUpper === "HR" || isAdmin;

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="dashboard-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="dashboard-content-wrapper">
        
        {/* ── 1. WELCOME HERO BANNER ── */}
        <section className="dash-hero-card">
          <div className="dash-hero-accent-strip" />
          <div className="dash-hero-main">
            <div className="dash-hero-avatar-box">
              <div className="dash-hero-avatar">{firstLetter}</div>
              <span className="dash-online-pulse" title="Active on Shift" />
            </div>

            <div className="dash-hero-info">
              <div className="dash-badge-row">
                <span className={`dash-status-pill ${isHR ? "hr-pill" : "staff-pill"}`}>
                  <span className="dot" /> {isHR ? "HR Administrator" : "Verified Staff Member"}
                </span>
                <span className="dash-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="dash-hero-title">
                Welcome back, <span className="dash-hero-highlight">{user.name}</span>
              </h1>
              <p className="dash-hero-subtitle">
                StaffPulse Enterprise Portal & Real-time Workplace Overview
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE METRIC KPI CARDS ── */}
        <section className="dash-metrics-grid">
          <div className="metric-kpi-card">
            <div className="metric-icon-box blue-kpi">🏢</div>
            <div className="metric-content">
              <span className="metric-title">Department</span>
              <h3 className="metric-value">{user.department}</h3>
              <span className="metric-subtext">Active Department Unit</span>
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-icon-box green-kpi">⚡</div>
            <div className="metric-content">
              <span className="metric-title">Work Status</span>
              <h3 className="metric-value">Active • On Duty</h3>
              <span className="metric-subtext text-success">Verified Session</span>
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-icon-box purple-kpi">🛡️</div>
            <div className="metric-content">
              <span className="metric-title">Access Level</span>
              <h3 className="metric-value">{isHR ? "Full Admin Access" : "Standard Employee"}</h3>
              <span className="metric-subtext">{isHR ? "Directory & Logs Enabled" : "Self-Service Portal"}</span>
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-icon-box cyan-kpi">🗓️</div>
            <div className="metric-content">
              <span className="metric-title">Joining Date</span>
              <h3 className="metric-value">{user.joiningDate}</h3>
              <span className="metric-subtext">Registered Profile</span>
            </div>
          </div>
        </section>

        {/* ── 3. MAIN DASHBOARD CONTENT GRID ── */}
        <div className="dash-main-grid">
          
          {/* ── LEFT: EMPLOYEE DOSSIER ── */}
          <div className="dash-section-card">
            <div className="card-header-row">
              <div>
                <h3 className="section-title">👤 Employee Dossier</h3>
                <p className="section-desc">Personal workplace information and office coordinates</p>
              </div>
            </div>

            <div className="dossier-list">
              <div className="dossier-row">
                <span className="dossier-label">
                  <span className="ic">📧</span> Work Email
                </span>
                <div className="dossier-value-group">
                  <b className="dossier-val">{user.email}</b>
                  <button className="copy-btn" onClick={copyEmail} title="Copy email">
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="dossier-row">
                <span className="dossier-label">
                  <span className="ic">🏢</span> Department
                </span>
                <span className="dossier-val highlight-tag">{user.department}</span>
              </div>

              <div className="dossier-row">
                <span className="dossier-label">
                  <span className="ic">💼</span> Position Title
                </span>
                <b className="dossier-val">{user.position}</b>
              </div>

              <div className="dossier-row">
                <span className="dossier-label">
                  <span className="ic">📱</span> Contact Phone
                </span>
                <b className="dossier-val">{user.phone}</b>
              </div>

              <div className="dossier-row">
                <span className="dossier-label">
                  <span className="ic">📍</span> Work Location
                </span>
                <b className="dossier-val">{user.address}</b>
              </div>

              <div className="dossier-row">
                <span className="dossier-label">
                  <span className="ic">🗓️</span> Registered Date
                </span>
                <b className="dossier-val">{user.joiningDate}</b>
              </div>
            </div>
          </div>

          {/* ── RIGHT: QUICK WORKSPACE ACTIONS & SYSTEM STATUS ── */}
          <div className="dash-side-col">
            
            {/* Quick Action Hub */}
            <div className="dash-section-card">
              <h3 className="section-title">⚡ Workspace Quick Actions</h3>
              <p className="section-desc">Navigate to key operational portals</p>

              <div className="action-buttons-grid">
                {isHR && (
                  <>
                    <button
                      className="quick-action-btn primary-action"
                      onClick={() => navigate("/Employees")}
                    >
                      <span className="btn-ic">👥</span>
                      <div className="btn-text-block">
                        <b>Staff Directory</b>
                        <span>Manage and view all employee profiles</span>
                      </div>
                    </button>

                    <button
                      className="quick-action-btn success-action"
                      onClick={() => navigate("/hr-attendance-dashboard")}
                    >
                      <span className="btn-ic">📅</span>
                      <div className="btn-text-block">
                        <b>Attendance Manager</b>
                        <span>Log daily presence and view absent list</span>
                      </div>
                    </button>
                  </>
                )}

                {/* 📋 Support Reports: ONLY FOR ADMIN */}
                {isAdmin && (
                  <button
                    className="quick-action-btn neutral-action"
                    onClick={() => navigate("/reports")}
                  >
                    <span className="btn-ic">📋</span>
                    <div className="btn-text-block">
                      <b>Support & HR Reports (Admin)</b>
                      <span>View tickets and departmental inquiries</span>
                    </div>
                  </button>
                )}

                <button
                  className="quick-action-btn neutral-action"
                  onClick={() => navigate("/profile")}
                >
                  <span className="btn-ic">👤</span>
                  <div className="btn-text-block">
                    <b>Personal Profile</b>
                    <span>Manage account credentials & view badge</span>
                  </div>
                </button>

                <button
                  className="quick-action-btn neutral-action"
                  onClick={() => navigate("/help")}
                >
                  <span className="btn-ic">💬</span>
                  <div className="btn-text-block">
                    <b>Help & Documentation</b>
                    <span>Browse FAQs or reach IT assistance</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Operational Status Card */}
            <div className="dash-section-card status-mini-card">
              <div className="status-header">
                <div className="status-indicator-dot" />
                <h4 className="status-heading">Shift & System Operational</h4>
              </div>
              <p className="status-text">
                All cloud microservices and database synchronization clusters are operating normally with 99.98% uptime.
              </p>
            </div>

          </div>

        </div>

        {/* ── 4. WORKPLACE ROLE ACCESS SWITCHER & EVALUATION SIMULATOR ── */}
        <section className="dash-section-card role-simulator-card">
          <div className="role-sim-header-row">
            <div className="role-sim-title-group">
              <div className="role-sim-badge">🎭 ROLE SIMULATOR</div>
              <h3 className="section-title">Workplace Role & Access Switcher</h3>
              <p className="section-desc">
                Select any organizational role below to immediately test and preview platform permissions.
              </p>
            </div>
            <div className="current-role-indicator">
              <span className="cur-lbl">Current Active Role</span>
              <span className="cur-val">{user.position || user.role || "Employee"}</span>
            </div>
          </div>

          {/* Mandatory English Disclaimer Box */}
          <div className="role-sim-disclaimer">
            <div className="disclaimer-alert-icon">⚠️</div>
            <div className="disclaimer-text-wrap">
              <b className="disclaimer-title">Temporary Access & Evaluation Notice:</b>
              <p className="disclaimer-body">
                This access is temporary so that you can explore and inspect the complete website. The system administrator can remove or revoke this option at any time.
              </p>
            </div>
          </div>

          {/* Toast / Notification when role is switched */}
          {roleChangeNotice && (
            <div className="role-sim-toast">
              <span>✅</span>
              <p>{roleChangeNotice}</p>
            </div>
          )}

          {/* Role Choice Buttons */}
          <div className="role-options-grid">
            <button
              type="button"
              className={`role-option-card ${roleUpper === "ADMIN" ? "selected" : ""}`}
              onClick={() => handleRoleChange("ADMIN")}
            >
              <div className="role-opt-icon admin-opt">👑</div>
              <div className="role-opt-info">
                <span className="role-opt-name">System Administrator (Admin)</span>
                <span className="role-opt-desc">Unlocks Support & HR Reports, Staff Directory, Attendance Roll</span>
              </div>
              {roleUpper === "ADMIN" && <span className="active-check">● Active</span>}
            </button>

            <button
              type="button"
              className={`role-option-card ${roleUpper === "HR" ? "selected" : ""}`}
              onClick={() => handleRoleChange("HR")}
            >
              <div className="role-opt-icon hr-opt">💼</div>
              <div className="role-opt-info">
                <span className="role-opt-name">HR Administrator</span>
                <span className="role-opt-desc">Staff Directory, Add Employee Onboarding, Attendance Hub</span>
              </div>
              {roleUpper === "HR" && <span className="active-check">● Active</span>}
            </button>

            <button
              type="button"
              className={`role-option-card ${roleUpper === "EMPLOYEE" ? "selected" : ""}`}
              onClick={() => handleRoleChange("Employee")}
            >
              <div className="role-opt-icon emp-opt">👤</div>
              <div className="role-opt-info">
                <span className="role-opt-name">Standard Employee</span>
                <span className="role-opt-desc">Personal Profile, Workplace Dashboard, Help Support</span>
              </div>
              {roleUpper === "EMPLOYEE" && <span className="active-check">● Active</span>}
            </button>

            <button
              type="button"
              className={`role-option-card ${roleUpper === "MANAGER" ? "selected" : ""}`}
              onClick={() => handleRoleChange("Manager")}
            >
              <div className="role-opt-icon mgr-opt">📈</div>
              <div className="role-opt-info">
                <span className="role-opt-name">Department Manager</span>
                <span className="role-opt-desc">Department Operations Overview, Personnel Review</span>
              </div>
              {roleUpper === "MANAGER" && <span className="active-check">● Active</span>}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
