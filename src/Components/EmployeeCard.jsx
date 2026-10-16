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
        employeeId: employee.id,
        status,
      });

      alert(`${employee.name} marked as ${status}`);

      // 🔄 parent ko batao (stats refresh ke liye)
      if (onAttendanceMarked) {
        onAttendanceMarked();
      }
    } catch (err) {
      console.error("Attendance error:", err);
      alert("Attendance mark failed");
    }
  };

  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.position || "-"}</p>
      <p>Phone: {employee.phone || "-"}</p>
      <p>Address: {employee.address || "-"}</p>
      <p>Salary: {employee.salary ? `₹ ${employee.salary}` : "-"}</p>
      <p>
        Joined:{" "}
        {employee.create_at
          ? new Date(employee.create_at).toLocaleDateString()
          : "-"}
      </p>

      {/* ✏️ Edit (sab ke liye) */}
      <Link to={`/edit-employee/${employee.id}`} className="edit-link">
        Edit
      </Link>

      {/* ✅ ATTENDANCE BUTTONS (ONLY HR) */}
      {user?.position === "HR" && (
        <div className="attendance-actions">
          <button
            className="present-btn"
            onClick={() => markAttendance("Present")}
          >
            Present
          </button>

          <button
            className="absent-btn"
            onClick={() => markAttendance("Absent")}
          >
            Absent
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
