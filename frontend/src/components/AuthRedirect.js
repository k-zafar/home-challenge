import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/tokenUtils";

const AuthRedirect = ({ element }) => {
  const isAuthenticated = getToken("authToken") !== "";

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the passed component
  return element;
};

export default AuthRedirect;
