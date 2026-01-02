import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  const userRoles = user.roles || [];

  // If allowedRoles = [], allow any logged-in user
  if (allowedRoles.length === 0) return children;

  const isAuthorized = userRoles.some((role) => allowedRoles.includes(role));

  if (!isAuthorized) return <Navigate to="/access-denied" replace />;

  return children;
};

export default ProtectedRoute;
