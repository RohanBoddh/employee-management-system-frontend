import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgPattern from "./images/bg-pattern.png";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const featureTabs = {
    attendance: {
      badge: "Live Workplace Tracking",
      title: "Real-Time Attendance & Status Monitoring",
      description:
        "Effortlessly record daily check-ins, automate absentee rate calculation, and maintain verifiable timestamped records for your entire organization.",
      metrics: [
        { label: "Today's Present", value: "94.2%", status: "positive" },
        { label: "Absentee Rate", value: "5.8%", status: "neutral" },
        { label: "Clock-in Speed", value: "< 1 sec", status: "positive" },
      ],
      previewList: [
        { name: "Aarav Sharma", dept: "HR", status: "Present", time: "09:02 AM" },
        { name: "Priya Patel", dept: "IT Development", status: "Present", time: "09:14 AM" },
        { name: "Rahul Verma", dept: "Finance", status: "Absent", time: "On Leave" },
      ],
    },
    directory: {
      badge: "Workforce Catalog",
      title: "Centralized Staff Directory & Departments",
      description:
        "Manage all personnel across HR, IT, Finance, Marketing, and Sales. Instant search by employee name or phone number with full salary and contact history.",
      metrics: [
        { label: "Total Departments", value: "5 Core", status: "neutral" },
        { label: "Search Latency", value: "Instant", status: "positive" },
        { label: "Records Encrypted", value: "100%", status: "positive" },
      ],
      previewList: [
        { name: "Vikram Malhotra", dept: "Engineering Lead", status: "Active", time: "Bangalore HQ" },
        { name: "Ananya Iyer", dept: "Marketing Director", status: "Active", time: "Mumbai Office" },
        { name: "Kunal Mehra", dept: "Finance Manager", status: "Active", time: "Delhi Branch" },
      ],
    },
    analytics: {
      badge: "Executive Insights",
      title: "Interactive Absenteeism & Workforce Analytics",
      description:
        "Make informed HR decisions with visual trend charts, absentee percentage breakdowns, and export-ready compliance summaries.",
      metrics: [
        { label: "Weekly Average", value: "96.4%", status: "positive" },
        { label: "HR Department", value: "100%", status: "positive" },
        { label: "Resolution Time", value: "2.4 hrs", status: "positive" },
      ],
      previewList: [
        { name: "Monday Trend", dept: "Overall Staff", status: "92% Present", time: "Verified" },
        { name: "Wednesday Peak", dept: "Overall Staff", status: "97% Present", time: "Verified" },
        { name: "Friday Summary", dept: "Overall Staff", status: "95% Present", time: "Verified" },
      ],
    },
    support: {
      badge: "Employee Helpdesk",
      title: "Integrated Support Ticketing & Resolution",
      description:
        "Employees can submit workplace queries and support requests directly to the HR administration with automated email alerts and resolution tracking.",
      metrics: [
        { label: "Tickets Resolved", value: "98.5%", status: "positive" },
        { label: "Notification", value: "Automated Email", status: "neutral" },
        { label: "Avg Resolution", value: "< 24h", status: "positive" },
      ],
      previewList: [
        { name: "Laptop Hardware Upgrade", dept: "IT Support", status: "Resolved", time: "Today" },
        { name: "PF & Tax Clarification", dept: "Finance / HR", status: "In Progress", time: "Pending" },
        { name: "Workstation Access Card", dept: "Admin Ops", status: "Resolved", time: "Yesterday" },
      ],
    },
  };

  const faqs = [
    {
      q: "How does the daily employee attendance tracking work?",
      a: "HR administrators can mark attendance as 'Present' or 'Absent' with one click from the employee directory or HR attendance dashboard. The system automatically computes daily absenteeism rates and updates real-time analytics charts.",
    },
    {
      q: "Who has access to the Staff Directory and salary details?",
      a: "Role-Based Access Control (RBAC) ensures only verified HR Administrators can add, edit, view compensation, or delete employee profiles. Regular staff members can access their personalized dashboard to view their profile.",
    },
    {
      q: "Can employees submit internal support tickets or issues?",
      a: "Yes! The Help Center allows any team member to submit queries or workplace issues directly to HR. Administrators can review all pending reports in the Reports portal and mark them as resolved.",
    },
    {
      q: "Is the data securely stored and cloud-backed?",
      a: "All employee credentials, records, and attendance histories are stored in MongoDB Atlas with encrypted password hashing (bcrypt) and JWT-based session security.",
    },
  ];

  return (
    <div className="app-root">
      {/* ══ HERO SECTION ══ */}
      <section className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              StaffPulse EMS v2.0 — Enterprise Grade
            </span>

            <h1>
              Modern Workforce <br />
              <span className="hero-highlight">Management Platform</span>
            </h1>

            <p>
              A unified, cloud-backed solution for modern organizations — manage staff records, track daily attendance, analyze absenteeism trends, and resolve employee queries in one intuitive workspace.
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary-hero">
                Get Started Free →
              </Link>
              <Link to="/login" className="btn-secondary-hero">
                Sign In to Portal
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Active Employees</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">99.9%</span>
                <span className="hero-stat-label">Cloud Availability</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">5</span>
                <span className="hero-stat-label">Core Departments</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <img src={bgPattern} alt="StaffPulse EMS Executive Dashboard" />
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE PLATFORM MODULES SHOWCASE ══ */}
      <section className="interactive-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="sub-badge">Platform Capabilities</span>
            <h2>Everything Your HR Department Needs</h2>
            <p>Explore the dedicated modules designed to simplify day-to-day organizational operations.</p>
          </div>

          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "attendance" ? "active" : ""}`}
              onClick={() => setActiveTab("attendance")}
            >
              🕒 Attendance Tracker
            </button>
            <button
              className={`tab-btn ${activeTab === "directory" ? "active" : ""}`}
              onClick={() => setActiveTab("directory")}
            >
              👥 Staff Directory
            </button>
            <button
              className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              📈 HR Analytics
            </button>
            <button
              className={`tab-btn ${activeTab === "support" ? "active" : ""}`}
              onClick={() => setActiveTab("support")}
            >
              🎫 Support Helpdesk
            </button>
          </div>

          {/* Active Tab Preview Card */}
          <div className="tab-preview-card">
            <div className="tab-info">
              <span className="tab-pill">{featureTabs[activeTab].badge}</span>
              <h3>{featureTabs[activeTab].title}</h3>
              <p>{featureTabs[activeTab].description}</p>

              <div className="tab-metrics">
                {featureTabs[activeTab].metrics.map((m, i) => (
                  <div key={i} className="tab-metric-box">
                    <span className="tab-metric-val">{m.value}</span>
                    <span className="tab-metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "24px" }}>
                <Link to="/signup" className="btn-accent-tab">
                  Launch {featureTabs[activeTab].badge} →
                </Link>
              </div>
            </div>

            <div className="tab-visual">
              <div className="mock-card-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="mock-title">Live Preview • {featureTabs[activeTab].badge}</span>
              </div>

              <div className="mock-list">
                {featureTabs[activeTab].previewList.map((item, i) => (
                  <div key={i} className="mock-item">
                    <div className="mock-avatar">{item.name.charAt(0)}</div>
                    <div className="mock-meta">
                      <b>{item.name}</b>
                      <span>{item.dept}</span>
                    </div>
                    <div className="mock-status">
                      <span className={`chip ${item.status.toLowerCase().includes("present") || item.status === "Active" || item.status === "Resolved" ? "chip-green" : "chip-amber"}`}>
                        {item.status}
                      </span>
                      <small>{item.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS (3 STEPS) ══ */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="sub-badge">Operational Flow</span>
            <h2>How StaffPulse EMS Works</h2>
            <p>From initial onboarding to daily presence tracking, streamline your workflow in 3 steps.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h3>Employee Onboarding</h3>
              <p>
                HR registers new staff profiles with position, phone, official address, and compensation details. Automated account activation ready.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">02</div>
              <h3>Daily Attendance Tracking</h3>
              <p>
                Mark presence with one-click status updates. The system tracks daily attendance and recalculates absenteeism trends in real-time.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">03</div>
              <h3>Analyze & Support</h3>
              <p>
                Monitor absenteeism charts, review employee support tickets, and resolve internal queries with full transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENTO FEATURE MATRIX ══ */}
      <section className="bento-section" id="features">
        <div className="section-container">
          <div className="section-header-center">
            <span className="sub-badge">Core Architecture</span>
            <h2>Built For Reliability, Scalability & Security</h2>
            <p>Designed to scale seamlessly from growing startups to enterprise teams.</p>
          </div>

          <div className="bento-grid">
            <div className="bento-card bento-span-2">
              <div className="bento-icon">🔒</div>
              <h3>Role-Based Access Control (RBAC)</h3>
              <p>
                Protected routes ensure sensitive compensation data, employee edits, and attendance controls are strictly reserved for authorized HR Administrators.
              </p>
              <span className="bento-tag">Enterprise Security</span>
            </div>

            <div className="bento-card">
              <div className="bento-icon">📊</div>
              <h3>Live Recharts Visuals</h3>
              <p>
                Integrated visual charts display day-by-day attendance fluctuations and absenteeism percentage curves.
              </p>
              <span className="bento-tag">Visual BI</span>
            </div>

            <div className="bento-card">
              <div className="bento-icon">📁</div>
              <h3>Multi-Department Filter</h3>
              <p>
                Group and view personnel across HR, IT, Finance, Marketing, and Sales with zero lag.
              </p>
              <span className="bento-tag">Instant Search</span>
            </div>

            <div className="bento-card bento-span-2">
              <div className="bento-icon">☁️</div>
              <h3>Cloud Database Architecture</h3>
              <p>
                Connected to MongoDB Atlas with automated schema validation and serverless connection pooling for non-stop availability.
              </p>
              <span className="bento-tag">MongoDB Atlas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ SECTION ══ */}
      <section className="faq-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="sub-badge">Frequently Asked</span>
            <h2>Questions & Answers</h2>
            <p>Everything you need to know about navigating and using StaffPulse EMS.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "faq-open" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CALL TO ACTION BANNER ══ */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h2>Ready to Modernize Your Workforce Management?</h2>
            <p>
              Join hundreds of teams managing attendance, departments, and employee support smoothly with StaffPulse EMS.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-cta-primary">
                Create Account Now →
              </Link>
              <Link to="/login" className="btn-cta-secondary">
                Sign In to Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
