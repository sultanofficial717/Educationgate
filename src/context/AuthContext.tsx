import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'student' | 'recruiter';
  profileComplete: boolean;
  isNewUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'student' | 'recruiter') => boolean;
  logout: () => void;
  register: (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'recruiter') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials
const DUMMY_USERS = {
  student: {
    email: 'student@edu360.com',
    password: 'student123',
    name: 'Ahmad Hassan',
  },
  recruiter: {
    email: 'recruiter@edu360.com',
    password: 'recruiter123',
    name: 'Sarah Khan',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string, userType: 'student' | 'recruiter'): boolean => {
    const dummy = DUMMY_USERS[userType];
    if (email === dummy.email && password === dummy.password) {
      const newUser: User = {
        id: userType === 'student' ? 'student-001' : 'recruiter-001',
        email,
        name: dummy.name,
        userType,
        profileComplete: true,
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'recruiter'): boolean => {
    // For demo purposes, allow registration
    const newUser: User = {
      id: `${userType}-${Date.now()}`,
      email,
      name: `${firstName} ${lastName}`,
      userType,
      profileComplete: false,
      isNewUser: true,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
