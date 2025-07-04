import React, {useMemo} from 'react';
import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {PaperProvider} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {SnackbarProvider} from './src/context/SnackbarContext';
import {AuthProvider} from './src/context/AuthContext';

enableScreens();

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    }),
    [isDarkMode],
  );

  return (
    <PaperProvider
      settings={{
        icon: props => <MaterialIcon {...props} />,
      }}>
      <SnackbarProvider>
        <Provider store={store}>
          <ThemeProvider>
            <SafeAreaProvider>
              <AuthProvider>
                <NavigationContainer>
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
          </ThemeProvider>
        </Provider>
      </SnackbarProvider>
    </PaperProvider>
  );
};

export default App;
