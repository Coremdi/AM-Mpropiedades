import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // If not logged in, send to login
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;