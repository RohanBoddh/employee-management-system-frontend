import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../services/api";
import "./AttendanceList.css";

const PresentEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stats/employees/present`)
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  return (
    <div className="attendance-page">
      <h2>Present Employees Today</h2>

      {employees.length === 0 ? (
        <p className="empty-text">No employees present today</p>
      ) : (
        <div className="cards-grid">
          {employees.map((emp) => (
            <div key={emp.id} className="employee-card present">
              <h4>{emp.name}</h4>
              <p>{emp.email}</p>
              <span className="badge present-badge">
                {emp.position}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PresentEmployees;
