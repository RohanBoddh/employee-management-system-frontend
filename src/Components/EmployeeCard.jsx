import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { BACKEND_URL } from "../services/api";
import "./EmployeeCard.css";

const EmployeeCard = ({ employee, onAttendanceMarked }) => {
  const { user } = useAuth();

  const markAttendance = async (status) => {
    try {
      await axios.post(`${BACKEND_URL}/attendance/mark`, {
        employeeId: employee.id || employee._id,
        status,
      });

      alert(`✅ ${employee.name} marked as ${status}`);

      if (onAttendanceMarked) {
        onAttendanceMarked();
      }
    } catch (err) {
      console.error("Attendance error:", err);
      alert("❌ Attendance mark failed");
    }
  };

  const initial = employee.name ? employee.name.charAt(0).toUpperCase() : "E";

  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div className="employee-avatar">{initial}</div>
        <div>
          <h3>{employee.name}</h3>
          <span className="employee-card-id">{employee.email}</span>
        </div>
      </div>

      <span className="badge">
        <span>🏢</span> {employee.position || "Employee"}
      </span>

      <p>
        <span className="ic">📱</span> {employee.phone || "No phone registered"}
      </p>

      <p>
        <span className="ic">📍</span> {employee.address || "HQ Office"}
      </p>

      <p>
        <span className="ic">💰</span>{" "}
        {employee.salary ? `₹${Number(employee.salary).toLocaleString()}` : "Not Disclosed"}
      </p>

      <div className="card-actions">
        <Link to={`/edit-employee/${employee.id || employee._id}`} className="edit-link">
          ✏️ Edit Details
        </Link>
      </div>

      {/* ✅ ATTENDANCE BUTTONS (ONLY HR) */}
      {user?.position?.toUpperCase() === "HR" && (
        <div className="attendance-actions bottom">
          <button
            className="present-btn"
            onClick={() => markAttendance("Present")}
          >
            ✓ Mark Present
          </button>

          <button
            className="absent-btn"
            onClick={() => markAttendance("Absent")}
          >
            ✕ Mark Absent
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
