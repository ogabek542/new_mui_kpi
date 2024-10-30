// src/hooks/useCloseApp.js

import { useNavigate } from 'react-router-dom';

export const useCloseHook = () => {
  const navigate = useNavigate();

  const useCloseHook = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back one step in the history stack
    } else {
      navigate('/'); // Navigate to the home page or default route
    }
  };

  return useCloseHook;
};
