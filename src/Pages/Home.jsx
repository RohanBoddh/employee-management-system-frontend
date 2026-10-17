import React from "react";
import bgPattern from "./images/bg-pattern.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="app-root">

      {/* ══ HERO ══ */}
      <section className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">

          <div className="hero-left">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              v2.0 — Now Live 🚀
            </span>

            <h1>
              Employee <br />
              Management <br />
              System
            </h1>

            <p>
              A powerful, all-in-one platform to manage your workforce
              efficiently — from onboarding to attendance, payroll to reports.
            </p>

            <div className="hero-buttons">
              <a href="/login" className="btn-primary-hero">
                Get Started →
              </a>
              <a href="#features" className="btn-secondary-hero">
                Learn More
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Employees Managed</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">99.9%</span>
                <span className="hero-stat-label">Uptime</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">24/7</span>
                <span className="hero-stat-label">Support</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <img src={bgPattern} alt="Employee Management Dashboard" />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="page-wrapper" id="features">
        <div className="page-container">
          <h2 className="section-heading">Our Features</h2>
          <p className="section-subheading">
            Everything you need to run HR operations smoothly — in one place.
          </p>

          <div className="cards-section">
            <div className="info-card">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80"
                alt="Manage Employees"
              />
              <div className="info-card-body">
                <span className="card-tag">Employees</span>
                <h3>Manage Employees</h3>
                <p>
                  Add, update, and organize all employee records in one
                  centralized system. Filter and search effortlessly.
                </p>
                <a href="#employees" className="read-link">
                  Read More →
                </a>
              </div>
            </div>

            <div className="info-card">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
                alt="Smart Dashboard"
              />
              <div className="info-card-body">
                <span className="card-tag">Dashboard</span>
                <h3>Smart Dashboard</h3>
                <p>
                  Get a real-time overview of company metrics, attendance
                  trends, and department insights at a glance.
                </p>
                <a href="#dashboard" className="read-link">
                  Read More →
                </a>
              </div>
            </div>

            <div className="info-card">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80"
                alt="Secure Data"
              />
              <div className="info-card-body">
                <span className="card-tag">Security</span>
                <h3>Secure Data</h3>
                <p>
                  Role-based access control and encrypted storage keep your
                  sensitive employee data safe and compliant.
                </p>
                <a href="#security" className="read-link">
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THEORY / INFO SECTIONS ══ */}
      <section className="theory-container">
        <div className="theory-box">

          <div id="employees" className="theory-section">
            <h2>🗂 Manage Employees</h2>
            <p>
              The Manage Employees module helps organizations store and manage
              all employee information in one centralized system. It allows
              administrators to add, update, and delete employee records easily.
              Important details like name, department, salary, contact number,
              address, and joining date can be maintained accurately. This
              feature reduces paperwork and improves data organization. Managers
              can quickly search, filter, and view employee details whenever
              required. It also supports better decision-making by providing
              structured and updated records. Secure access ensures that only
              authorized users can edit sensitive data. Overall, the module
              improves efficiency, saves time, and helps maintain smooth HR
              operations.
            </p>
          </div>

          <div id="dashboard" className="theory-section">
            <h2>📊 Smart Dashboard</h2>
            <p>
              The Smart Dashboard gives a quick overview of company data in one
              place. It shows total employees, departments, and key updates with
              simple visuals and summaries. Managers can easily track
              performance and understand what's happening in the organization.
              The clean layout makes information easy to read and saves time.
              Overall, it helps in faster and smarter decision-making.
            </p>
          </div>

          <div id="security" className="theory-section">
            <h2>🔒 Secure Data</h2>
            <p>
              Secure Data ensures that all employee information is safely stored
              and protected from unauthorized access. The system uses secure
              login authentication and proper database protection to keep
              sensitive data confidential. Only authorized users can view or
              edit important records. Regular backups and security measures help
              prevent data loss. This keeps the organization's information safe
              and reliable.
            </p>
          </div>

          <div id="hr-guidelines" className="theory-section">
            <h2>📋 HR Guidelines</h2>
            <p>
              HR Guidelines provide a clear framework for how employees should
              work and behave within the organization. They outline rules for
              attendance, leave, performance, and workplace conduct. These
              guidelines help maintain discipline, transparency, and fair
              treatment for all employees. They also support managers in
              handling employee issues and decision-making. Overall, HR
              guidelines create a structured and positive work environment.
            </p>
          </div>

          <div id="hr-policies" className="theory-section">
            <h2>📜 HR Policies</h2>
            <p>
              HR Policies define the rules and benefits that apply to all
              employees in the organization. They cover areas such as
              attendance, leave management, compensation, and workplace
              behavior. These policies ensure fairness, consistency, and
              compliance with company standards. They also help employees
              understand their rights and responsibilities clearly. Strong HR
              policies support a professional, organized, and productive work
              environment.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
