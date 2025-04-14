import React, {useMemo} from 'react';
import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './src/store';
import MainTabs from './src/navigation/BottomTabNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {PaperProvider} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import 'react-native-reanimated'; // <- must come before react-native-paper or navigation
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
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <SafeAreaView style={backgroundStyle}>
                <MainTabs />
              </SafeAreaView>
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </PaperProvider>
  );
};

export default App;
