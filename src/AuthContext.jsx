import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [acceptNavigate, setAcceptNavigate] = useState(false);

  return (
    <AuthContext.Provider value={{ acceptNavigate, setAcceptNavigate }}>
      {children}
    </AuthContext.Provider>
  );
};