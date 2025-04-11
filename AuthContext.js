import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the authentication context
const AuthContext = createContext({});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthority, setIsAuthority] = useState(false);

  // Check for stored user data on app launch
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedAuthority = await AsyncStorage.getItem('isAuthority');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthority(storedAuthority === 'true');
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (userData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just store the user data locally
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthority(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just store the user data locally
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthority(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const registerAuthority = async (authorityData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just store the authority data locally
      await AsyncStorage.setItem('user', JSON.stringify(authorityData));
      await AsyncStorage.setItem('isAuthority', 'true');
      setUser(authorityData);
      setIsAuthority(true);
      return true;
    } catch (error) {
      console.error('Authority registration error:', error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isAuthority');
      setUser(null);
      setIsAuthority(false);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  // Update user profile function
  const updateUserProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  // Context value
  const value = {
    user,
    loading,
    isAuthority,
    login,
    register,
    registerAuthority,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 