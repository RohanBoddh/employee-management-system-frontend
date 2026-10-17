import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      setUser({
        name: "Guest Employee",
        email: "demo@company.com",
        phone: "+91 98765 43210",
        address: "HQ Suite 400",
        department: "HR",
        position: "HR",
        joiningDate: new Date().toISOString().slice(0, 10),
      });
      return;
    }

    fetch(`${API_BASE_URL}/employees/email/${storedUser.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Employee not found");
        return res.json();
      })
      .then((data) => {
        setUser({
          name: data.name || storedUser.name || "Employee",
          email: data.email || storedUser.email,
          phone: data.phone || "Not Specified",
          address: data.address || "Headquarters",
          department: data.position || storedUser.position || "Staff",
          position: data.position || storedUser.position || "Staff",
          joiningDate: data.createdAt ? data.createdAt.slice(0, 10) : "2026-01-15",
        });
      })
      .catch((err) => {
        console.warn("Using stored user fallback:", err.message);
        setUser({
          name: storedUser.name || "Employee",
          email: storedUser.email,
          phone: "Not Specified",
          address: "Headquarters",
          department: storedUser.position || "Staff",
          position: storedUser.position || "Staff",
          joiningDate: "2026-01-15",
        });
      });
  }, []);

  if (!user) {
    return (
      <div className="user-dashboard">
        <div className="dash-card">
          <div className="dash-top-accent" />
          <h2>Loading Dashboard...</h2>
          <p className="dash-subtitle">Fetching your workplace profile</p>
        </div>
      </div>
    );
  }

  const isHR = user.position?.toUpperCase() === "HR";

  return (
    <div className="user-dashboard">
      <div className="dash-card">
        <div className="dash-top-accent" />

        <div className="dash-role-badge">
          <span>●</span> {user.position?.toUpperCase() === "HR" ? "HR Administrator" : "Verified Staff Member"}
        </div>

        <h2>{user.name}</h2>
        <p className="dash-subtitle">Employee Portal & Workspace Overview</p>

        <div className="info-list">
          <div className="info">
            <span className="info-label"><span>📧</span> Work Email</span>
            <b>{user.email}</b>
          </div>

          <div className="info">
            <span className="info-label"><span>🏢</span> Department</span>
            <b>{user.department}</b>
          </div>

          <div className="info">
            <span className="info-label"><span>📱</span> Contact Phone</span>
            <b>{user.phone}</b>
          </div>

          <div className="info">
            <span className="info-label"><span>📍</span> Location Office</span>
            <b>{user.address}</b>
          </div>

          <div className="info">
            <span className="info-label"><span>🗓️</span> Joined On</span>
            <b>{user.joiningDate}</b>
          </div>
        </div>

        <div className="dash-actions">
          {isHR && (
            <button
              className="dash-action-btn dash-action-primary"
              onClick={() => navigate("/Employees")}
            >
              👥 Manage Staff
            </button>
          )}

          <button
            className="dash-action-btn dash-action-secondary"
            onClick={() => navigate("/help")}
          >
            💬 Support Helpdesk
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
