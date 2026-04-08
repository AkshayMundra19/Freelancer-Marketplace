import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState('#3b82f6'); // Default blue

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    
    const savedAccent = localStorage.getItem('accentColor');
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
    document.documentElement.style.setProperty('--primary', accentColor);
    // Also set a hover version (roughly darkened)
    document.documentElement.style.setProperty('--primary-hover', accentColor + 'ee');
  }, [accentColor]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

