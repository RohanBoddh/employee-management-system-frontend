import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeservice";
import EmployeeCard from "../Components/EmployeeCard";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { API_BASE_URL } from "../services/api";
import "./Employees.css";
import hrAttendanceImg from "../Pages/images/hr-attendance.png";

const Employees = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showEmployees, setShowEmployees] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user || (user.position !== "HR" && user.role !== "Admin")) {
      alert("Access denied: Only HR/Admin can view employees");
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const empRes = await getEmployees();
        setEmployees(empRes.data);

        const reportRes = await fetch(
          `${API_BASE_URL}/support/all-reports`
        );
        const reportData = await reportRes.json();
        setReports(reportData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(async () => {
      try {
        const reportRes = await fetch(
          `${API_BASE_URL}/support/all-reports`
        );
        const reportData = await reportRes.json();
        setReports(reportData);
      } catch (err) {
        console.error(err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  if (loading) return <Loader />;

  const filteredEmployees = employees.filter((emp) => {
    const matchesDept =
      !selectedDepartment || emp.position === selectedDepartment;

    const matchesSearch =
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone?.includes(searchTerm);

    return matchesDept && matchesSearch;
  });

  return (
    <div className="employees-page">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h2>Employee Details Dashboard</h2>
        </div>

        <div className="top-dashboard-container">
          {/* Department Filter */}
          <div className="mini-card">
            <p className="card-title">Departments</p>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setShowEmployees(true);
              }}
            >
              <option value="">All</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Employees Toggle */}
          <div className="mini-card">
            <p className="card-title">Employees</p>
            <button
              className="view-btn"
              onClick={() => {
                setSelectedDepartment("");
                setShowEmployees((prev) => !prev);
              }}
            >
              {showEmployees ? "Hide Employees" : "View All Employees"}
            </button>
          </div>

          {/* Total Employees */}
          <div className="mini-card center">
            <p className="card-title">Total Employees</p>
            <h2>{employees.length}</h2>
          </div>

          {/* ✅ Support Reports Card (Clickable) */}
          <div
            className="mini-card"
            onClick={() => navigate("/reports")}
            style={{ cursor: "pointer" }}
          >
            <p className="card-title">Support Reports</p>
            <h2>{reports.length}</h2>
          </div>

          {/* Add Employee */}
          <div
            className="add-employee-card"
            onClick={() => navigate("/AddEmployee")}
          >
            <div className="add-icon">+</div>
            <h3>Add New Employee</h3>
            <p>Click to add a new employee</p>
          </div>
        </div>

        {/* Search */}
        {showEmployees && (
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Employee List */}
        {showEmployees && (
          <div className="employee-grid">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <EmployeeCard key={emp.id} employee={emp} />
              ))
            ) : (
              <p className="no-data">No employees found</p>
            )}
          </div>
        )}

        {/* Explore Section */}
        <div className="explore-section">
          <h3 className="explore-title">Explore More Dashboards</h3>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <img
                src={hrAttendanceImg}
                alt="HR Attendance Dashboard"
                className="dashboard-img"
              />
              <span className="dashboard-tag">HR</span>
              <h4>HR Employee Attendance Details Dashboard</h4>
              <p>
                Analyze employee attendance trends, absenteeism rates, and
                attendance statistics.
              </p>
              <button
                className="dashboard-btn"
                onClick={() => navigate("/hr-attendance-dashboard")}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
