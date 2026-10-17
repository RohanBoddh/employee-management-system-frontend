import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const activeUser = user || JSON.parse(sessionStorage.getItem("user") || "null");
  if (!activeUser) return <Navigate to="/Login" replace />;

  const pos = (activeUser.position || "").toUpperCase();
  const role = (activeUser.role || "").toUpperCase();
  const isAdmin = pos === "ADMIN" || role === "ADMIN";

  // 👑 System Administrators have universal access to all modules
  if (isAdmin) {
    return children;
  }

  // If specific allowed roles were required (e.g. HR or ADMIN)
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some((r) => {
      const rUpper = r.toUpperCase();
      return (
        rUpper === pos ||
        rUpper === role ||
        (rUpper === "HR" && (pos.includes("HR") || role.includes("HR")))
      );
    });

    if (!isAllowed) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  return children;
};

export default PrivateRoute;
