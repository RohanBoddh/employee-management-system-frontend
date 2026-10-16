import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { API_BASE_URL } from "../services/api";
import "./Reports.css";

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || (user.position !== "HR" && user.role !== "Admin")) {
      alert("Access denied");
      navigate("/");
      return;
    }

    fetchReports();
  }, [user, navigate]);

  const fetchReports = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/support/all-reports`
      );
      const data = await res.json();
      setReports(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await fetch(
        `${API_BASE_URL}/support/delete-report/${id}`,
        { method: "DELETE" }
      );

      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2 className="reports-title">Employee Support Reports</h2>
        <span className="total-badge">{reports.length} Reports</span>
      </div>

      {reports.length === 0 ? (
        <p className="no-reports">No reports available.</p>
      ) : (
        <div className="reports-container">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <h4 className="report-name">{report.name}</h4>
              <p className="report-email">
  <strong>Email:</strong>{" "}
  <a href={`mailto:${report.email}`} className="email-link">
    {report.email}
  </a>
</p>

              <p className="report-issue">{report.issue}</p>

              <button
                onClick={() => handleResolve(report.id)}
                className="resolve-btn"
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
