import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addEmployee } from "../services/employeeservice";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "IT",
    phone: "",
    address: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      await addEmployee({
        name: form.name,
        email: form.email,
        position: form.department, // Backend column = position
        phone: form.phone,
        address: form.address,
        salary: form.salary ? Number(form.salary) : null,
      });

      setSuccessMsg(`🎉 Employee "${form.name}" has been registered successfully!`);
      setTimeout(() => {
        navigate("/employees");
      }, 1400);
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to register employee. Please verify details and ensure email is unique.");
    } finally {
      setLoading(false);
    }
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const firstLetter = form.name.trim() ? form.name.trim().charAt(0).toUpperCase() : "👤";

  return (
    <div className="add-emp-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="add-emp-content-wrapper">
        {/* ── 1. WELCOME HERO BANNER (DASHBOARD STYLE) ── */}
        <section className="dash-hero-card">
          <div className="dash-hero-accent-strip" />
          <div className="dash-hero-main">
            <div className="dash-hero-avatar-box">
              <div className="dash-hero-avatar">➕</div>
              <span className="dash-online-pulse" title="HR Onboarding Active" />
            </div>

            <div className="dash-hero-info">
              <div className="dash-badge-row">
                <span className="dash-status-pill hr-pill">
                  <span className="dot" /> HR Onboarding Engine
                </span>
                <span className="dash-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="dash-hero-title">
                Register & Onboard <span className="dash-hero-highlight">New Employee</span>
              </h1>
              <p className="dash-hero-subtitle">
                Create verified personnel credentials, allocate departmental hierarchy, and establish payroll base.
              </p>
            </div>

            <div className="dash-hero-actions">
              <Link to="/employees" className="dash-cta-btn">
                👥 Staff Directory
              </Link>
              <Link to="/hr-attendance-dashboard" className="dash-secondary-btn">
                📊 Attendance Hub
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE METRIC KPI CARDS (DASHBOARD STYLE) ── */}
        <section className="dash-metrics-grid">
          <div className="metric-kpi-card">
            <div className="metric-icon-box blue-kpi">🏢</div>
            <div className="metric-content">
              <span className="metric-title">Target Department</span>
              <h3 className="metric-value">{form.department || "IT"}</h3>
              <span className="metric-subtext">Department Allocation</span>
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-icon-box green-kpi">⚡</div>
            <div className="metric-content">
              <span className="metric-title">Onboarding Status</span>
              <h3 className="metric-value">{form.name ? "Drafting Record" : "Awaiting Input"}</h3>
              <span className="metric-subtext text-success">
                {form.name ? "Form In Progress" : "Ready for Input"}
              </span>
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-icon-box cyan-kpi">💰</div>
            <div className="metric-content">
              <span className="metric-title">Compensation Tier</span>
              <h3 className="metric-value">
                {form.salary ? `₹${Number(form.salary).toLocaleString()}` : "Not Assigned"}
              </h3>
              <span className="metric-subtext">Monthly Base Pay</span>
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-icon-box purple-kpi">🛡️</div>
            <div className="metric-content">
              <span className="metric-title">Access Clearance</span>
              <h3 className="metric-value">
                {form.department === "HR" ? "Admin Access" : "Standard Staff"}
              </h3>
              <span className="metric-subtext">Automated Role Mapping</span>
            </div>
          </div>
        </section>

        {/* ── 3. MAIN DASHBOARD CONTENT GRID (2 COLUMNS) ── */}
        <div className="add-emp-main-grid">
          {/* ── LEFT: ONBOARDING FORM ── */}
          <div className="add-emp-card">
            <div className="card-header-row">
              <div>
                <h3 className="section-title">📝 Personnel Dossier Entry</h3>
                <p className="section-desc">
                  Provide verified employee details for corporate database creation
                </p>
              </div>
              <span className="form-req-pill">* Required Fields</span>
            </div>

            {successMsg && (
              <div className="add-emp-success-banner">
                <span className="success-icon">✅</span>
                <div>
                  <h4>Registration Complete</h4>
                  <p>{successMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="add-emp-form">
              {/* Group 1: Identity */}
              <div className="form-section-divider">
                <span className="section-tag">01. Identity & Contact</span>
              </div>

              <div className="add-emp-form-grid">
                {/* Full Name */}
                <div className="add-emp-field">
                  <label className="add-emp-label">Full Name *</label>
                  <div className="add-emp-input-wrap">
                    <span className="add-emp-input-icon">👤</span>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      className="add-emp-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Corporate Email */}
                <div className="add-emp-field">
                  <label className="add-emp-label">Corporate Email *</label>
                  <div className="add-emp-input-wrap">
                    <span className="add-emp-input-icon">✉️</span>
                    <input
                      type="email"
                      placeholder="e.g. alex.morgan@company.com"
                      className="add-emp-input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="add-emp-field">
                  <label className="add-emp-label">Direct Contact Phone</label>
                  <div className="add-emp-input-wrap">
                    <span className="add-emp-input-icon">📱</span>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      className="add-emp-input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Department Selection */}
                <div className="add-emp-field">
                  <label className="add-emp-label">Assigned Department *</label>
                  <div className="add-emp-input-wrap">
                    <span className="add-emp-input-icon">🏢</span>
                    <select
                      className="add-emp-select"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      required
                    >
                      <option value="IT">IT & Software Engineering</option>
                      <option value="HR">Human Resources</option>
                      <option value="Engineering">Product Engineering</option>
                      <option value="Finance">Finance & Corporate Accounts</option>
                      <option value="Marketing">Marketing & Communications</option>
                      <option value="Sales">Sales & Revenue Operations</option>
                      <option value="Operations">Workplace & Operations</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 2: Workplace & Compensation */}
              <div className="form-section-divider">
                <span className="section-tag">02. Workplace & Payroll</span>
              </div>

              <div className="add-emp-form-grid">
                {/* Office Location */}
                <div className="add-emp-field full-span">
                  <label className="add-emp-label">Office Location / Branch Desk</label>
                  <div className="add-emp-input-wrap">
                    <span className="add-emp-input-icon">📍</span>
                    <input
                      type="text"
                      placeholder="e.g. Headquarters Tower 1, Floor 4, Suite 402"
                      className="add-emp-input"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                </div>

                {/* Base Salary */}
                <div className="add-emp-field full-span">
                  <label className="add-emp-label">Monthly Compensation (INR ₹)</label>
                  <div className="add-emp-input-wrap">
                    <span className="add-emp-input-icon">💰</span>
                    <input
                      type="number"
                      placeholder="e.g. 75000"
                      className="add-emp-input"
                      value={form.salary}
                      onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="add-emp-actions">
                <Link to="/employees" className="add-emp-cancel-btn">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className={`add-emp-submit-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner" /> Registering Record...
                    </>
                  ) : (
                    "🚀 Confirm & Onboard Employee"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ── RIGHT: LIVE BADGE PREVIEW & PROTOCOL ── */}
          <div className="add-emp-sidebar">
            {/* Live Corporate Badge Card */}
            <div className="id-badge-preview-card">
              <div className="id-badge-header">
                <span className="id-badge-chip">STAFFPULSE ID</span>
                <span className="id-badge-status">● VERIFIED</span>
              </div>

              <div className="id-badge-body">
                <div className="id-badge-avatar">
                  {firstLetter}
                </div>
                <div className="id-badge-details">
                  <h4 className="id-badge-name">
                    {form.name.trim() || "Employee Name"}
                  </h4>
                  <span className="id-badge-role">
                    {form.department || "Department"}
                  </span>
                  <p className="id-badge-email">
                    {form.email.trim() || "employee@company.com"}
                  </p>
                </div>
              </div>

              <div className="id-badge-footer">
                <div className="id-badge-meta">
                  <span className="meta-lbl">Location</span>
                  <span className="meta-val">{form.address || "HQ Campus"}</span>
                </div>
                <div className="id-badge-meta">
                  <span className="meta-lbl">Salary</span>
                  <span className="meta-val">
                    {form.salary ? `₹${Number(form.salary).toLocaleString()}` : "Pending"}
                  </span>
                </div>
              </div>

              <div className="id-badge-barcode">
                <div className="barcode-lines" />
                <span className="barcode-text">ID-REG-{new Date().getFullYear()}-EMP</span>
              </div>
            </div>

            {/* Protocol SOP Checklist */}
            <div className="onboard-sop-card">
              <div className="sop-header">
                <span className="sop-icon">📋</span>
                <div>
                  <h4 className="sop-title">Onboarding Protocol</h4>
                  <span className="sop-sub">Standard operating criteria</span>
                </div>
              </div>

              <ul className="sop-list">
                <li>
                  <span className="sop-bullet">✓</span>
                  <div>
                    <b>Unique Corporate Email</b>
                    <p>Must not duplicate an existing staff account in the directory.</p>
                  </div>
                </li>
                <li>
                  <span className="sop-bullet">✓</span>
                  <div>
                    <b>Automatic Shift Roll Call</b>
                    <p>New personnel are immediately integrated into the Attendance Hub roster.</p>
                  </div>
                </li>
                <li>
                  <span className="sop-bullet">✓</span>
                  <div>
                    <b>Role-Based Permission</b>
                    <p>HR department assignments automatically grant portal administration access.</p>
                  </div>
                </li>
                <li>
                  <span className="sop-bullet">✓</span>
                  <div>
                    <b>Encrypted Storage</b>
                    <p>Personal and compensation data is stored encrypted in cloud storage.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
