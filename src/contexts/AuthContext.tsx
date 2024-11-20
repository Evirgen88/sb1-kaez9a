import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  login: (merchantId: string, username: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const login = async (merchantId: string, username: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (merchantId === '1' && username === 'a@a.com' && password === '1234') {
      setIsAuthorized(true);
      return true;
    }
    return false;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Simulate API call
    if (otp === '123456' && isAuthorized) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthorized(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthorized, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}