import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('accessToken');
  console.log("token pada PrivateRoute: ", token);
  const isAuthenticated = !!token;

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;