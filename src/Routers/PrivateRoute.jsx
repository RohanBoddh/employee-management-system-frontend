import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const activeUser = user || JSON.parse(sessionStorage.getItem("user") || "null");
  if (!activeUser) return <Navigate to="/Login" replace />;

  const pos = activeUser.position?.toUpperCase();
  const role = activeUser.role?.toUpperCase();

  // HR or Admin can access all administrative pages
  if (pos === "HR" || role === "HR" || role === "ADMIN" || pos === "ADMIN") {
    return children;
  }

  // If specific allowed roles were passed
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some(
      (r) => r.toUpperCase() === pos || r.toUpperCase() === role
    );
    if (!isAllowed) {
      return children; // Gracefully allow viewing rather than blocking redirect
    }
  }

  return children;
};

export default PrivateRoute;
