import React from "react";
import bgPattern from "./images/bg-pattern.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="app-root">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              Employee <br /> Management System
            </h1>
            <p>
              Employee management is the process by which employers ensure
              workers perform their jobs efficiently to achieve business goals.
            </p>
          </div>

          <div className="hero-right">
            <img src={bgPattern} alt="Hero" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="page-wrapper">
        <div className="page-container">
          <h2 className="section-heading">Our Features</h2>

          <div className="cards-section">
            <div className="info-card">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />
              <span className="card-tag">EMPLOYEES</span>
              <h3>Manage Employees</h3>
              <a href="#employees" className="read-link">
                Read More →
              </a>
            </div>

            <div className="info-card">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" />
              <span className="card-tag">DASHBOARD</span>
              <h3>Smart Dashboard</h3>
              <a href="#dashboard" className="read-link">
                Read More →
              </a>
            </div>

            <div className="info-card">
              <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3" />
              <span className="card-tag">SECURITY</span>
              <h3>Secure Data</h3>
              <a href="#security" className="read-link">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* THEORY */}
      <section className="theory-container">
        <div className="theory-box">
          <div id="employees" className="theory-section">
            <h2> Manage Employees</h2>
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
            <h2> Smart Dashboard</h2>
            <p>
              The Smart Dashboard gives a quick overview of company data in one
              place. It shows total employees, departments, and key updates with
              simple visuals and summaries. Managers can easily track
              performance and understand what’s happening in the organization.
              The clean layout makes information easy to read and saves time.
              Overall, it helps in faster and smarter decision-making.
            </p>
          </div>

          <div id="security" className="theory-section">
            <h2> Secure Data</h2>
            <p>
              Secure Data ensures that all employee information is safely stored
              and protected from unauthorized access. The system uses secure
              login authentication and proper database protection to keep
              sensitive data confidential. Only authorized users can view or
              edit important records. Regular backups and security measures help
              prevent data loss. This keeps the organization’s information safe
              and reliable.
            </p>
          </div>

          <div id="hr-guidelines" className="theory-section">
            <h2> HR Guidelines</h2>
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
            <h2> HR Policies</h2>
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
