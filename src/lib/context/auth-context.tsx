/**
 * @fileoverview Authentication Context Provider
 * Manages global authentication state and user session handling
 */

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  username: string;
  email: string;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    timePlayed: number;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * 
 * Provides authentication context to the application:
 * - Manages user session state
 * - Handles login/logout operations
 * - Persists authentication state
 * - Provides auth-related utility functions
 * 
 * @param props.children - Child components to be wrapped with auth context
 */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Handles user login
   * @param email - User's email
   * @param password - User's password
   * @throws Error if login fails
   */

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      router.push('/game');

    } catch (error) {
      throw error;
    }
  };

   /**
   * Handles new user registration
   * @param username - Desired username
   * @param email - User's email
   * @param password - Desired password
   * @throws Error if registration fails
   */
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      
      // Store in localStorage and state
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      router.push('/game');

    } catch (error) {
      throw error;
    }
  };

  /**
   * Handles user logout
   * - Clears local storage
   * - Resets user state
   * - Redirects to home page
   */
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use authentication context
 * @returns Authentication context
 * @throws Error if used outside AuthProvider
 */

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}