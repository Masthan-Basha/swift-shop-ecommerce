import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  // 🚀 Added || {} to prevent crashing if the auth slice isn't loaded yet
  const auth = useSelector((state) => state.auth || {});
  const { userInfo } = auth;

  // 🛡️ Safety Check: 
  // 1. If we are still "thinking" or state is empty, don't crash.
  // 2. If user is logged in AND is an admin, let them through.
  // 3. Otherwise, send them to login.
  
  if (userInfo && userInfo.isAdmin) {
    return <Outlet />;
  } else {
    // replace ensures they can't go "back" into a locked page
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;