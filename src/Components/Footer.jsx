import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/hr-attendance-dashboard">
                Attendance
              </Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#hr-guidelines">HR Guidelines</a>
            </li>
            <li>
              <a href="#hr-policies">HR Policies</a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/help">Help Center</Link>
            </li>
            <li>
              <a href="#">Contact Support</a>
              <span className="support-email">example@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Employee Management System
      </div>
    </footer>
  );
}

export default Footer;
