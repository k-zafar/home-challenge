import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/tokenUtils";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = getToken("authToken") !== "";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the passed component
  return element;
};

export default PrivateRoute;
