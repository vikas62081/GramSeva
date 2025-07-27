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

import {PaperProvider} from 'react-native-paper';
import {GramSevaLightTheme, GramSevaDarkTheme} from './src/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {SnackbarProvider} from './src/context/SnackbarContext';
import {AuthProvider} from './src/context/AuthContext';
import {RBACProvider} from './src/context/RBACContext';

enableScreens();

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const paperTheme = isDarkMode ? GramSevaDarkTheme : GramSevaLightTheme;
  const navTheme = isDarkMode ? NavDarkTheme : NavDefaultTheme;

  return (
    <PaperProvider
      settings={{icon: props => <MaterialIcon {...props} />}}
      theme={paperTheme}>
      <SnackbarProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <AuthProvider>
              <RBACProvider>
                <NavigationContainer theme={navTheme}>
                  <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={paperTheme.colors.background}
                  />
                  <SafeAreaView style={{flex: 1}}>
                    <AppNavigator />
                  </SafeAreaView>
                </NavigationContainer>
              </RBACProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </Provider>
      </SnackbarProvider>
    </PaperProvider>
  );
};

export default App;
