
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  username: string;
  faithQuotient: number;
  favoriteEntities: string[];
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const defaultUserData: UserData = {
  username: 'Zade',
  faithQuotient: 0.92,
  favoriteEntities: ['Lyra', 'Auraline']
};

const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  updateUserData: () => {}
});

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  
  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
