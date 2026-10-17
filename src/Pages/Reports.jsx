import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { API_BASE_URL } from "../services/api";
import "./Reports.css";

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [resolvingId, setResolvingId] = useState(null);

  useEffect(() => {
    const position = user?.position?.toUpperCase();
    const role = user?.role?.toUpperCase();
    const isAdmin = position === "ADMIN" || role === "ADMIN";

    if (!user || !isAdmin) {
      const stored = JSON.parse(sessionStorage.getItem("user") || "null");
      const storedPos = stored?.position?.toUpperCase();
      const storedRole = stored?.role?.toUpperCase();
      const isStoredAdmin = storedPos === "ADMIN" || storedRole === "ADMIN";

      if (!isStoredAdmin) {
        alert("Access restricted: Only System Administrators (Admin) can view Support & HR Reports.");
        navigate("/dashboard");
        return;
      }
    }

    fetchReports();
  }, [user, navigate]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/support/all-reports`);
      if (res.ok) {
        const data = await res.json();
        setReports(Array.isArray(data) ? data : []);
      }
      setLoading(false);
    } catch (err) {
      console.error("Reports fetch error:", err);
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    setResolvingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/support/delete-report/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.id !== id && r._id !== id));
      } else {
        alert("Could not resolve report. Please try again.");
      }
    } catch (err) {
      console.error("Resolve error:", err);
      alert("Error contacting support server.");
    } finally {
      setResolvingId(null);
    }
  };

  if (loading) return <Loader />;

  const filteredReports = reports.filter((r) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.name?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.issue?.toLowerCase().includes(term)
    );
  });

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="reports-page-container">
      {/* ── AMBIENT HOME-PAGE BLUE GLOW & GRID ── */}
      <div className="dash-bg-grid" />
      <div className="dash-bg-orb dash-bg-orb-1" />
      <div className="dash-bg-orb dash-bg-orb-2" />

      <div className="reports-content-wrapper">
        {/* ── 1. WELCOME HERO BANNER ── */}
        <section className="rep-hero-card">
          <div className="rep-hero-accent-strip" />
          <div className="rep-hero-main">
            <div className="rep-hero-avatar-box">
              <div className="rep-hero-avatar">📋</div>
              <span className="rep-online-pulse" title="Desk Active" />
            </div>

            <div className="rep-hero-info">
              <div className="rep-badge-row">
                <span className="rep-status-pill">
                  <span className="dot" /> HR Support Helpdesk
                </span>
                <span className="rep-date-badge">🗓️ {todayDate}</span>
              </div>
              <h1 className="rep-hero-title">
                Employee Grievances & <span className="rep-hero-highlight">Support Reports</span>
              </h1>
              <p className="rep-hero-subtitle">
                Review workplace inquiries, resolve employee issues, and maintain corporate satisfaction.
              </p>
            </div>

            <div className="rep-hero-actions">
              <Link to="/help" className="rep-cta-btn">
                🎧 Help Center
              </Link>
              <Link to="/dashboard" className="rep-secondary-btn">
                📊 HR Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE KPI METRICS ── */}
        <section className="rep-metrics-grid">
          <div className="rep-metric-card">
            <div className="rep-metric-icon blue-kpi">📬</div>
            <div className="rep-metric-content">
              <span className="rep-metric-title">Active Tickets</span>
              <h3 className="rep-metric-value">{reports.length}</h3>
              <span className="rep-metric-subtext">Pending Resolution</span>
            </div>
          </div>

          <div className="rep-metric-card">
            <div className="rep-metric-icon green-kpi">⚡</div>
            <div className="rep-metric-content">
              <span className="rep-metric-title">Resolution Speed</span>
              <h3 className="rep-metric-value">&lt; 2 Hours</h3>
              <span className="rep-metric-subtext text-success">Within SLA Target</span>
            </div>
          </div>

          <div className="rep-metric-card">
            <div className="rep-metric-icon purple-kpi">🛡️</div>
            <div className="rep-metric-content">
              <span className="rep-metric-title">Security & Privacy</span>
              <h3 className="rep-metric-value">Confidential</h3>
              <span className="rep-metric-subtext">Restricted HR Access</span>
            </div>
          </div>

          <div className="rep-metric-card">
            <div className="rep-metric-icon cyan-kpi">🏢</div>
            <div className="rep-metric-content">
              <span className="rep-metric-title">Portal Status</span>
              <h3 className="rep-metric-value">Operational</h3>
              <span className="rep-metric-subtext">Live Ticketing Engine</span>
            </div>
          </div>
        </section>

        {/* ── 3. SEARCH & FILTER BAR ── */}
        <section className="rep-search-bar-row">
          <div className="rep-search-box">
            <span className="rep-search-ic">🔍</span>
            <input
              type="text"
              className="rep-search-input"
              placeholder="Filter reports by employee name, email, or issue content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="rep-clear-search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="rep-count-badge">
            Showing <b>{filteredReports.length}</b> of <b>{reports.length}</b> tickets
          </div>
        </section>

        {/* ── 4. TICKETS GRID ── */}
        <section className="rep-cards-grid">
          {filteredReports.length === 0 ? (
            <div className="rep-empty-state">
              <span className="empty-ic">🎉</span>
              <h3>No Active Support Inquiries</h3>
              <p>
                {searchTerm
                  ? "No reports match your search query."
                  : "All employee tickets are resolved and up to date!"}
              </p>
              {searchTerm && (
                <button
                  className="rep-reset-btn"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            filteredReports.map((report) => {
              const repId = report.id || report._id;
              const firstLetter = report.name
                ? report.name.charAt(0).toUpperCase()
                : "U";

              return (
                <div key={repId} className="rep-card">
                  <div className="rep-card-header">
                    <div className="rep-card-avatar">{firstLetter}</div>
                    <div className="rep-card-meta">
                      <h4 className="rep-card-name">{report.name}</h4>
                      <a
                        href={`mailto:${report.email}`}
                        className="rep-card-email"
                        title="Click to email employee"
                      >
                        ✉️ {report.email}
                      </a>
                    </div>
                    <span className="rep-ticket-pill">Ticket</span>
                  </div>

                  <div className="rep-card-body">
                    <span className="rep-issue-label">Reported Issue:</span>
                    <p className="rep-issue-text">{report.issue}</p>
                  </div>

                  <div className="rep-card-footer">
                    <button
                      onClick={() => handleResolve(repId)}
                      className={`rep-resolve-btn ${
                        resolvingId === repId ? "loading" : ""
                      }`}
                      disabled={resolvingId === repId}
                    >
                      {resolvingId === repId ? "Resolving..." : "✓ Mark as Resolved"}
                    </button>
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

export default Reports;
