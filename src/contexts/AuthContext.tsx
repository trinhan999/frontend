'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing user data on app load
    const storedUser = Cookies.get('user');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let logoutTimer: NodeJS.Timeout | null = null;

    function scheduleAutoLogout(token: string) {
      try {
        // Decode JWT to get expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        if (exp) {
          const now = Math.floor(Date.now() / 1000);
          const timeLeft = exp - now;
          if (timeLeft > 0) {
            logoutTimer = setTimeout(() => {
              logout();
            }, timeLeft * 1000);
          } else {
            logout();
          }
        }
      } catch (e) {
        // If decoding fails, logout for safety
        logout();
      }
    }

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        scheduleAutoLogout(token);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        Cookies.remove('user');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      }
    } else if (!token && storedUser) {
      // Clear user data if no token exists
      Cookies.remove('user');
    }
    setIsLoading(false);

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    // Schedule auto logout on login
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      // Decode and schedule auto logout
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        if (exp) {
          const now = Math.floor(Date.now() / 1000);
          const timeLeft = exp - now;
          if (timeLeft > 0) {
            setTimeout(() => {
              logout();
            }, timeLeft * 1000);
          } else {
            logout();
          }
        }
      } catch (e) {
        logout();
      }
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    // Clear JWT token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/login');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 