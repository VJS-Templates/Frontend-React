import { createContext, useContext, useState, useMemo } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(authService.isAuthenticated);
  const [userType, setUserType] = useState(null);

  const login = async (email, password) => {
    await authService.login(email, password);
    setLoggedIn(authService.isAuthenticated);
    setUserType(authService.userType);
  };

  const logout = () => {
    authService.logout();
    setLoggedIn(authService.isAuthenticated);
  };

  const authContextValue = useMemo(
    () => ({ isLoggedIn, userType, login, logout }),
    [isLoggedIn, userType, login, logout]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
