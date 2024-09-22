import React from 'react';
import { Navigate } from 'react-router-dom';
import isTokenValid from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!isTokenValid(token)) {
    // If no valid token, redirect to login
    return <Navigate to="/login" />;
  }

  // If valid token exists, render the children components
  return children;
};

export default ProtectedRoute;
