import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider as StyledProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from '../theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemScheme = useColorScheme(); // Detect system theme
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemScheme === 'dark'); // Auto-detect system changes
  }, [systemScheme]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <StyledProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
};

// Custom Hook to Use Theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
