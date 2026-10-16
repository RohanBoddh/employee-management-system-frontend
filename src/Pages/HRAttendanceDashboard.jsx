import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, API_BASE_URL } from "../services/api";
import "./HRAttendanceDashboard.css";
import HRAnalytics from "../Components/HRAnalytics";

const HRAttendanceDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalHR: 0,
    presentToday: 0,
    absentToday: 0,
    absenteeRate: 0,
  });

  const [hrEmployees, setHrEmployees] = useState([]);

  // 🔄 Fetch HR stats
  const fetchHRStats = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/stats/hr`);
      setStats(res.data);
    } catch (err) {
      console.error("HR stats error", err);
    }
  };

  // 👥 Fetch HR employees
  const fetchHREmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/employees`);
      const hrOnly = res.data.filter((emp) => emp.position === "HR");
      setHrEmployees(hrOnly);
    } catch (err) {
      console.error("HR employees error", err);
    }
  };

  // ✅ Mark attendance
  const markAttendance = async (employeeId, status) => {
    try {
      await axios.post(`${BACKEND_URL}/attendance/mark`, {
        employeeId,
        status,
      });

      fetchHRStats(); // refresh stats (REAL-TIME)
    } catch (err) {
      console.error("Attendance error", err);
    }
  };

  useEffect(() => {
    fetchHRStats();
    fetchHREmployees();
  }, []);

  return (
    <div className="dashboard-wrapper1">
      <h2>HR Employee Attendance Details Dashboard</h2>

      {/* 🔢 STATS */}
      <div className="top-dashboard-container">
        <div className="mini-card">
          <p>Total HR Employees</p>
          <h2>{stats.totalHR}</h2>
        </div>

        <div
          className="mini-card clickable"
          onClick={() => navigate("/hr/present")}
        >
          <p>Present Employees Today</p>
          <h2>{stats.presentToday}</h2>
        </div>

        <div
          className="mini-card clickable"
          onClick={() => navigate("/hr/absent")}
        >
          <p>Absent Employees Today</p>
          <h2>{stats.absentToday}</h2>
        </div>

        <div className="mini-card">
          <p>Absentee Rate</p>
          <h2>{stats.absenteeRate}%</h2>
        </div>
      </div>

      {/* ✅ ANALYTICS SECTION (ONLY ADDITION) */}
      <HRAnalytics stats={stats} />

      {/* 👥 HR LIST + ATTENDANCE */}
      <div className="attendance-section">
        <h3>Mark Only HR Attendance</h3>

        {hrEmployees.length === 0 ? (
          <p>No HR employees found</p>
        ) : (
          hrEmployees.map((emp) => (
            <div key={emp.id} className="attendance-row">
              <span>{emp.name}</span>

              <div className="attendance-buttons">
                <button
                  className="present-btn"
                  onClick={() => markAttendance(emp.id, "Present")}
                >
                  Present
                </button>

                <button
                  className="absent-btn"
                  onClick={() => markAttendance(emp.id, "Absent")}
                >
                  Absent
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HRAttendanceDashboard;
