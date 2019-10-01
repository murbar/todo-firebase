import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from 'fb/auth';

// https://gist.github.com/murbar/1d1c90ee30561ceecbb431db801e7410

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('auth update, user:', user);
  }, [user]);

  useEffect(() => {
    const cancelListener = auth.onUserChange(user => {
      setUser(user);
      setIsInitialized(true);
    });

    return () => cancelListener;
  }, [setUser]);

  const loginWithEmail = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await auth.loginWithEmail(email, password);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // accept callback, e.g. for redirect?
  const logout = async () => {
    try {
      auth.logout();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const contextValue = {
    user,
    isInitialized,
    isLoading,
    error,
    loginWithEmail,
    logout
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
