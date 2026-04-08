import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load users and current session from local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = (email) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
