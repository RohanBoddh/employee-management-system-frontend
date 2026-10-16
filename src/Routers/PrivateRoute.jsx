import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait while checking auth

  if (!user) return <Navigate to="/Login" replace />; // not logged in

  // HR can access everything
  if (user.position === "HR") return children;

  // Non-HR: allow only if allowedRoles includes user's role
  if (allowedRoles && !allowedRoles.includes(user.position)) {
    return <Navigate to="/Dashboard" replace />; // redirect non-HR trying to access HR pages
  }

  return children;
};

export default PrivateRoute;
