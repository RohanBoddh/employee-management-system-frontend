import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { API_BASE_URL } from "../services/api";
import "./HelpCenter.css";

const HelpCenter = () => {
  const { user } = useAuth();
  const roleUpper = (user?.role || user?.position || "").toUpperCase();
  const isAdmin = roleUpper === "ADMIN" || roleUpper === "ADMINISTRATOR" || roleUpper === "HR ADMIN";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmittedMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/support/submit-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, issue }),
      });

      const data = await response.json();
      setSubmittedMessage(data.message || "Your support inquiry has been logged successfully.");

      // Reset form
      setName("");
      setEmail("");
      setIssue("");
    } catch (error) {
      console.error("Support submission error:", error);
      alert("Failed to submit inquiry. Please verify connectivity.");
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "How do I register a new employee into the system?",
      a: "Navigate to the Staff Directory (/employees) or Dashboard, click on '+ Add New Employee', fill in mandatory credentials (name, email, phone, department, salary), and submit the form.",
      tag: "Personnel",
    },
    {
      q: "How can I mark daily attendance for staff?",
      a: "Open the HR Attendance Hub (/hr-attendance-dashboard). You can click '✓ Present' or '✕ Absent' next to each officer. You can also mark attendance directly on each employee card in the Directory.",
      tag: "Attendance",
    },
    {
      q: "What should I do if an employee forgot their password?",
      a: "Direct the employee to the Login screen and click 'Forgot Password'. They can input their registered email address to receive an official self-service reset link.",
      tag: "Security",
    },
    {
      q: "Who has permission to view financial and salary details?",
      a: "Only verified HR Administrators and Executive System Admins have access to confidential salary figures, attendance records, and grievance reports.",
      tag: "Access",
    },
    {
      q: "How are grievance reports reviewed and resolved?",
      a: "All tickets submitted through this portal are securely queued in the Reports Center (/reports). HR administrators review the inquiry and can click 'Resolve' once action is taken.",
      tag: "Support",
    },
  ];

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="help-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="help-content-wrapper">
        {/* ── 1. WELCOME HERO BANNER ── */}
        <section className="hlp-hero-card">
          <div className="hlp-hero-accent-strip" />
          <div className="hlp-hero-main">
            <div className="hlp-hero-avatar-box">
              <div className="hlp-hero-avatar">🎧</div>
              <span className="hlp-online-pulse" title="Support Active" />
            </div>

            <div className="hlp-hero-info">
              <div className="hlp-badge-row">
                <span className="hlp-status-pill">
                  <span className="dot" /> 24/7 Corporate Knowledge Base
                </span>
                <span className="hlp-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="hlp-hero-title">
                Helpdesk & <span className="hlp-hero-highlight">Support Services</span>
              </h1>
              <p className="hlp-hero-subtitle">
                Access self-service guides, frequently asked workplace questions, or submit a confidential ticket.
              </p>
            </div>

            <div className="hlp-hero-actions">
              {isAdmin && (
                <Link to="/reports" className="hlp-cta-btn">
                  📋 View Reports
                </Link>
              )}
              <Link to="/dashboard" className="hlp-secondary-btn">
                📊 Workspace
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. QUICK KPI METRICS ── */}
        <section className="hlp-metrics-grid">
          <div className="hlp-metric-card">
            <div className="hlp-metric-icon blue-kpi">💡</div>
            <div className="hlp-metric-content">
              <span className="hlp-metric-title">Self Service</span>
              <h3 className="hlp-metric-value">Verified FAQs</h3>
              <span className="hlp-metric-subtext">Instant procedural answers</span>
            </div>
          </div>

          <div className="hlp-metric-card">
            <div className="hlp-metric-icon green-kpi">⚡</div>
            <div className="hlp-metric-content">
              <span className="hlp-metric-title">Direct Response</span>
              <h3 className="hlp-metric-value">&lt; 2 Hours</h3>
              <span className="hlp-metric-subtext text-success">Dedicated HR Dispatch</span>
            </div>
          </div>

          <div className="hlp-metric-card">
            <div className="hlp-metric-icon purple-kpi">🔒</div>
            <div className="hlp-metric-content">
              <span className="hlp-metric-title">Data Privacy</span>
              <h3 className="hlp-metric-value">256-bit Encrypted</h3>
              <span className="hlp-metric-subtext">Confidential handling</span>
            </div>
          </div>
        </section>

        {/* ── 3. MAIN DUAL-COLUMN GRID: FAQS + CONTACT FORM ── */}
        <div className="hlp-main-grid">
          {/* LEFT: FREQUENTLY ASKED QUESTIONS */}
          <section className="hlp-faq-section">
            <div className="hlp-section-header">
              <h3 className="hlp-section-title">Frequently Asked Questions</h3>
              <p className="hlp-section-desc">
                Curated solutions for common workplace & administration workflows.
              </p>
            </div>

            <div className="hlp-faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="hlp-faq-card">
                  <div className="hlp-faq-header">
                    <span className="hlp-faq-number">0{index + 1}</span>
                    <h4 className="hlp-faq-question">{faq.q}</h4>
                    <span className="hlp-faq-tag">{faq.tag}</span>
                  </div>
                  <p className="hlp-faq-answer">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: CONTACT SUPPORT TICKET FORM */}
          <section className="hlp-form-section">
            <div className="hlp-section-header">
              <h3 className="hlp-section-title">Submit Support Ticket</h3>
              <p className="hlp-section-desc">
                Facing an issue? Dispatch an inquiry directly to the HR administration queue.
              </p>
            </div>

            {submittedMessage && (
              <div className="hlp-success-alert">
                <span>✅</span>
                <p>{submittedMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="hlp-contact-form">
              <div className="hlp-input-group">
                <label className="hlp-label">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="hlp-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="hlp-input-group">
                <label className="hlp-label">Corporate Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. j.doe@company.com"
                  className="hlp-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="hlp-input-group">
                <label className="hlp-label">Issue Description</label>
                <textarea
                  placeholder="Describe your inquiry, request, or issue in detail..."
                  className="hlp-textarea"
                  rows={5}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`hlp-submit-btn ${submitting ? "loading" : ""}`}
                disabled={submitting}
              >
                {submitting ? "Dispatching Ticket..." : "🚀 Submit Support Ticket"}
              </button>

              <p className="hlp-form-note">
                🔒 All tickets are dispatched to the secure HR administrative queue for resolution.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
