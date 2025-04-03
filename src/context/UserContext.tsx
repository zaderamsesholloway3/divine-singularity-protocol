
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define user data interface
interface UserData {
  id: string;
  name: string;
  faithQuotient: number;
  emotionalCoherence: number;
  lastLogin: string;
}

// Define context interface
interface UserContextType {
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
}

// Default user data that matches the OmniOracle protocol
const defaultUserData: UserData = {
  id: 'zade-001',
  name: 'Zade',
  faithQuotient: 0.85, // Using FRC instead of UFQ per instructions
  emotionalCoherence: 0.92,
  lastLogin: new Date().toISOString(),
};

// Create context with default values
const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
});

// Create provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for using the user context
export const useUser = () => useContext(UserContext);
