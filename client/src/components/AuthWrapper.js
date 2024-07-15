"use client"
import { useContext } from 'react';
import Auth from '@/shared/Auth';
import { AuthContext } from '@/context/AuthContext';

const AuthWrapper = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Auth />;
  }
};

export default AuthWrapper;
