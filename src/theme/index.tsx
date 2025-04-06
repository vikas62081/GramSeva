export interface CustomTheme {
  dark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    subtext: string;
    border: string;
    error: string;
    success: string;
    gradientStart: string;
    gradientEnd: string;
    surface: string;
    placeholder: string;
    disabled: string;
    notification: string;
  };
}

export const lightTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: '#3494E6',
    secondary: '#EC6EAD',
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#2d3436',
    subtext: '#666666',
    border: '#e1e1e1',
    error: '#ff4444',
    success: '#4CAF50',
    gradientStart: '#3494E6',
    gradientEnd: '#EC6EAD',
    surface: '#ffffff',
    placeholder: '#9ca3af',
    disabled: '#d1d5db',
    notification: '#3494E6',
  },
};

export const darkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: '#3494E6',
    secondary: '#EC6EAD',
    background: '#121212', // Proper dark mode background
    card: '#1e1e1e', // Slightly lighter than background
    text: '#ffffff',
    subtext: '#a0a0a0',
    border: '#2d2d2d',
    error: '#ff6b6b',
    success: '#69F0AE',
    gradientStart: '#3494E6',
    gradientEnd: '#EC6EAD',
    surface: '#1e1e1e',
    placeholder: '#6b7280',
    disabled: '#374151',
    notification: '#3494E6',
  },
};

// Helper function to get elevation colors for dark mode
export const getDarkElevation = (elevation: number) => {
  const overlayColor = '#ffffff';
  const opacity = (elevation / 24) * 0.15; // Max elevation is 24
  return `rgba(${overlayColor}, ${opacity})`;
};

// Helper function to get shadow styles
export const getShadow = (elevation: number) => ({
  elevation,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: elevation / 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: elevation,
});

export const placeholderTextColor = '#B0B0B0';
