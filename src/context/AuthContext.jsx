import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Имитация API запроса
    const mockUser = {
      id: Date.now(),
      name: credentials.email.split('@')[0],
      email: credentials.email,
      phone: '+7 (999) 123-45-67',
      bonuses: 100,
      address: 'ул. Кофейная, д. 123, кв. 45'
    };
    
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    setUser(mockUser);
    return { 
      success: true,
      user: mockUser
    };
  };

  const register = async (userData) => {
    // Имитация API запроса
    const mockUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      bonuses: 100,
      address: ''
    };
    
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    setUser(mockUser);
    return { 
      success: true,
      user: mockUser
    };
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('user_data', JSON.stringify(newUser));
      return newUser;
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};