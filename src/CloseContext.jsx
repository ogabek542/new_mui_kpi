// CloseContext.jsx
import React, { createContext, useContext } from 'react';

const CloseContext = createContext();

export const useClose = () => {
  return useContext(CloseContext);
};

export const CloseProvider = ({ children, handleClose }) => {
  // If no handleClose function is provided, use a default one
  const defaultHandleClose = () => {
    console.warn("No close function provided. Using default handleClose.");
    // Default close behavior, e.g., navigate to home
  };

  return (
    <CloseContext.Provider value={handleClose || defaultHandleClose}>
      {children}
    </CloseContext.Provider>
  );
};
