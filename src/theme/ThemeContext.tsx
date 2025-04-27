import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DarkThemeColors, LightThemeColors } from '../constants/color';

type ThemeColors = {
  background: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
  cardBackground: string;
  border: string;
  inputBackground: string;
  inputText: string;
  uniqueAccent1: string;
  uniqueAccent2: string;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: ThemeColors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? DarkThemeColors : LightThemeColors;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
