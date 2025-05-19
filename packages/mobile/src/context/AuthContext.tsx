import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  onboardingAnswers: Record<string, any>;
  setOnboardingAnswers: (answers: Record<string, any>) => void;
};

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  onboardingAnswers: {},
  setOnboardingAnswers: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start as false to show onboarding
  const [onboardingAnswers, setOnboardingAnswers] = useState<Record<string, any>>({});
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, onboardingAnswers, setOnboardingAnswers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 