"use client"
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('Token from cookie:', token);

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
