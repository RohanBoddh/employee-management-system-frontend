import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";
import "./Dashboard.css";
import userBg from "../Pages/images/userdetailbackground.avif";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      setUser({
        name: "Guest",
        email: "",
        phone: "-",
        address: "-",
        department: "-",
        joiningDate: "-",
      });
      return;
    }

    fetch(`${API_BASE_URL}/employees/email/${storedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          department: data.position,
          joiningDate: data.create_at?.slice(0, 10),
        });
      })
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div
      className="user-dashboard"
      style={{
        backgroundImage: `url(${userBg})`,
      }}
    >
      {/* USER DETAILS */}
      <div className="dash-card">
        <h2>User Details</h2>

        <div className="info"><b>Name:</b> {user.name}</div>
        <div className="info"><b>Email:</b> {user.email}</div>
        <div className="info"><b>Phone:</b> {user.phone}</div>
        <div className="info"><b>Department:</b> {user.department}</div>
        <div className="info"><b>Address:</b> {user.address}</div>
        <div className="info"><b>Joining Date:</b> {user.joiningDate}</div>
      </div>
    </div>
  );
};

export default Dashboard;
