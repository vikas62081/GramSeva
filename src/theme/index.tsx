import {configureFonts, MD3Theme} from 'react-native-paper';

export const GramSevaLightTheme: MD3Theme = {
  dark: false,
  roundness: 4,
  version: 3,
  isV3: true,
  colors: {
    // Primary - Indigo Core
    primary: '#3F51B5', // Indigo 500
    onPrimary: '#FFFFFF',
    primaryContainer: '#C5CAE9', // Indigo 100
    onPrimaryContainer: '#1A237E', // Indigo 900

    // Secondary - Indigo Variant
    secondary: '#5C6BC0', // Indigo 400
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8EAF6', // Indigo 50
    onSecondaryContainer: '#303F9F', // Indigo 700

    // Tertiary - Deep Purple accent
    tertiary: '#9575CD',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#EDE7F6',
    onTertiaryContainer: '#4A148C',

    // Background & Surface
    background: '#FFFFFF',
    onBackground: '#1A237E',
    surface: '#FFFFFF',
    onSurface: '#1A237E',
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#3C3C3C',

    // Disabled
    surfaceDisabled: 'rgba(0,0,0,0.12)',
    onSurfaceDisabled: 'rgba(0,0,0,0.38)',

    // Errors
    error: '#D32F2F',
    onError: '#FFFFFF',
    errorContainer: '#FFCDD2',
    onErrorContainer: '#B71C1C',

    // Outline
    outline: '#7986CB',
    outlineVariant: '#C5CAE9',

    // Inverse
    inverseSurface: '#1A237E',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#C5CAE9',

    // Shadows & effects
    shadow: '#000000',
    scrim: '#000000',
    backdrop: 'rgba(63, 81, 181, 0.3)',

    // Elevation
    elevation: {
      level0: 'transparent',
      level1: '#F3F4FD',
      level2: '#ECEEFE',
      level3: '#E6E9FD',
      level4: '#E0E3FC',
      level5: '#DBDFFC',
    },
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export const GramSevaDarkTheme: MD3Theme = {
  dark: false,
  roundness: 4,
  version: 3,
  isV3: true,
  colors: {
    // Primary - Indigo Core
    primary: '#7986CB', // Indigo 300
    onPrimary: '#FFFFFF',
    primaryContainer: '#1A237E', // Indigo 900
    onPrimaryContainer: '#C5CAE9', // Indigo 100

    // Secondary - Indigo Variant
    secondary: '#9FA8DA', // Indigo 200
    onSecondary: '#1A237E',
    secondaryContainer: '#303F9F', // Indigo 700
    onSecondaryContainer: '#E8EAF6',

    // Tertiary - Soft Violet
    tertiary: '#B39DDB', // Deep Purple 200
    onTertiary: '#311B92',
    tertiaryContainer: '#512DA8',
    onTertiaryContainer: '#EDE7F6',

    // Backgrounds and surfaces
    background: '#121212',
    onBackground: '#EDEDED',
    surface: '#1C1C1E',
    onSurface: '#F5F5F5',
    surfaceVariant: '#2C2C2E',
    onSurfaceVariant: '#CCCCCC',

    // Disabled states
    surfaceDisabled: 'rgba(255,255,255,0.12)',
    onSurfaceDisabled: 'rgba(255,255,255,0.38)',

    // Errors
    error: '#EF5350',
    onError: '#000000',
    errorContainer: '#B00020',
    onErrorContainer: '#FFCDD2',

    // Outline
    outline: '#5C6BC0',
    outlineVariant: '#9FA8DA',

    // Inverse
    inverseSurface: '#E8EAF6',
    inverseOnSurface: '#1A237E',
    inversePrimary: '#C5CAE9',

    // Extras
    shadow: '#000000',
    scrim: '#000000',
    backdrop: 'rgba(63, 81, 181, 0.4)',

    // Elevation (Indigo-tinted)
    elevation: {
      level0: 'transparent',
      level1: '#21233A',
      level2: '#2A2D4A',
      level3: '#313358',
      level4: '#3A3C6C',
      level5: '#424378',
    },
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export const placeholderTextColor = '#999';
