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
        position: form.department, // DB column = position
        phone: form.phone,
        address: form.address,
        salary: form.salary ? Number(form.salary) : null,
      });

      setSuccessMsg(`Employee ${form.name} registered successfully!`);
      setTimeout(() => {
        navigate("/employees");
      }, 1200);
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to register employee. Please verify details.");
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

  return (
    <div className="add-emp-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="add-emp-content-wrapper">
        {/* ── HERO BANNER ── */}
        <div className="add-emp-top-nav">
          <Link to="/employees" className="add-emp-back-btn">
            ← Back to Staff Directory
          </Link>
          <span className="add-emp-date-badge">🗓️ {todayDate}</span>
        </div>

        {/* ── FORM MASTER CARD ── */}
        <div className="add-emp-card">
          <div className="add-emp-accent-strip" />

          <div className="add-emp-header">
            <div className="add-emp-avatar">👤</div>
            <div className="add-emp-header-info">
              <span className="add-emp-pill">
                <span className="dot" /> HR Onboarding Engine
              </span>
              <h1 className="add-emp-title">
                Onboard <span className="add-emp-highlight">New Employee</span>
              </h1>
              <p className="add-emp-subtitle">
                Enter corporate personnel records, assign department, and establish compensation tier.
              </p>
            </div>
          </div>

          {successMsg && (
            <div className="add-emp-success-banner">
              <span>✅</span>
              <p>{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="add-emp-form">
            <div className="add-emp-form-grid">
              {/* Full Name */}
              <div className="add-emp-field">
                <label className="add-emp-label">Full Name *</label>
                <div className="add-emp-input-wrap">
                  <span className="add-emp-input-icon">👤</span>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    className="add-emp-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="add-emp-field">
                <label className="add-emp-label">Corporate Email Address *</label>
                <div className="add-emp-input-wrap">
                  <span className="add-emp-input-icon">✉️</span>
                  <input
                    type="email"
                    placeholder="e.g. s.jenkins@company.com"
                    className="add-emp-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Department */}
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
                    <option value="HR">HR & Talent Administration</option>
                    <option value="IT">IT & Software Engineering</option>
                    <option value="Finance">Finance & Corporate Accounts</option>
                    <option value="Marketing">Marketing & Communications</option>
                    <option value="Sales">Sales & Growth Operations</option>
                  </select>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="add-emp-field">
                <label className="add-emp-label">Direct Phone Number</label>
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

              {/* Address / Location */}
              <div className="add-emp-field full-span">
                <label className="add-emp-label">Office Location / Branch Address</label>
                <div className="add-emp-input-wrap">
                  <span className="add-emp-input-icon">📍</span>
                  <input
                    type="text"
                    placeholder="e.g. Headquarters Tower 1, Floor 4"
                    className="add-emp-input"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Salary */}
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

            {/* Submit & Cancel Actions */}
            <div className="add-emp-actions">
              <Link to="/employees" className="add-emp-cancel-btn">
                Cancel
              </Link>
              <button
                type="submit"
                className={`add-emp-submit-btn ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Registering Employee..." : "🚀 Confirm & Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
