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
  const isAdmin = pos === "ADMIN" || role === "ADMIN";

  // If specific allowed roles were required (e.g. ADMIN only for Reports)
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some(
      (r) => r.toUpperCase() === pos || r.toUpperCase() === role
    );
    if (!isAllowed) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  // General administrative routes (accessible by HR and Admin)
  if (pos === "HR" || role === "HR" || isAdmin) {
    return children;
  }

  return children;
};

export default PrivateRoute;
