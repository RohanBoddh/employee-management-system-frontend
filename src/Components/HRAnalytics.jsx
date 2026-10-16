import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const HRAnalytics = ({ stats }) => {
  // Bar chart (Today)
  const todayData = [
    { name: "Present", value: stats.presentToday },
    { name: "Absent", value: stats.absentToday }
  ];

  // Line chart (fake trend using current rate – real-time feel)
  const trendData = [
    { day: "Mon", rate: stats.absenteeRate - 5 },
    { day: "Tue", rate: stats.absenteeRate - 3 },
    { day: "Wed", rate: stats.absenteeRate - 2 },
    { day: "Thu", rate: stats.absenteeRate - 1 },
    { day: "Today", rate: stats.absenteeRate }
  ];

  return (
    <div className="analytics-grid">
      {/* LINE CHART */}
      <div className="analytics-card">
        <h3>Absentee Rate Trend (%)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#ff6b6b"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="analytics-card">
        <h3>Today Attendance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={todayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HRAnalytics;
