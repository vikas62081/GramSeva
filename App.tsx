import React, {useMemo} from 'react';
import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

import {PaperProvider, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {SnackbarProvider} from './src/context/SnackbarContext';
import {AuthProvider} from './src/context/AuthContext';

enableScreens();

// 🌿 Gram Seva Primary Color
// const PRIMARY_GREEN = '#5DBA5F';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      flex: 1,
    }),
    [isDarkMode],
  );

  // 🧱 Define custom Paper & Navigation themes
  const paperTheme = useMemo(
    () => ({
      ...(isDarkMode ? MD3DarkTheme : MD3LightTheme),
      colors: {
        ...(isDarkMode ? MD3DarkTheme.colors : MD3LightTheme.colors),
        // primary: PRIMARY_GREEN,
      },
    }),
    [isDarkMode],
  );

  const navTheme = useMemo(
    () => ({
      ...(isDarkMode ? NavDarkTheme : NavDefaultTheme),
      colors: {
        ...(isDarkMode ? NavDarkTheme.colors : NavDefaultTheme.colors),
        // primary: PRIMARY_GREEN,
        background: backgroundStyle.backgroundColor,
      },
    }),
    [isDarkMode, backgroundStyle],
  );

  return (
    <PaperProvider
      settings={{icon: props => <MaterialIcon {...props} />}}
      theme={paperTheme}>
      <SnackbarProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <AuthProvider>
              <NavigationContainer theme={navTheme}>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                />
                <SafeAreaView style={backgroundStyle}>
                  <AppNavigator />
                </SafeAreaView>
              </NavigationContainer>
            </AuthProvider>
          </SafeAreaProvider>
        </Provider>
      </SnackbarProvider>
    </PaperProvider>
  );
};

export default App;
