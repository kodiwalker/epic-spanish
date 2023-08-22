import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/authcheck')
      .then(res => res.json())
      .then(data => {
        console.log('UserProvider RAN', data)
        if (data.isAuthenticated && data.user) {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
