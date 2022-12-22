import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();
  return currentUser ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
