import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the requested component if authenticated
  return children;
};

export default PrivateRoute;
