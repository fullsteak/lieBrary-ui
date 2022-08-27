import React from 'react';
import { WithChildren } from '../../types';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<WithChildren> = ({ children }) => {
  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/auth" />
  }
  return (
    <div style={{height: '100%', width: '100%'}}>
      {children}
    </div>
  )
}
