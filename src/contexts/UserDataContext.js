import React, { createContext, useState, useContext } from 'react';

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  // actions

  const contextValue = {
    userData
    // actions
  };

  return (
    <UserDataContext.Provider value={contextValue}>{children}</UserDataContext.Provider>
  );
};

const useUserData = () => useContext(UserDataContext);

export { UserDataProvider, useUserData };
