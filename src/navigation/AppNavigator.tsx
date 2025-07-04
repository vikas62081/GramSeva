import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAuth} from '../context/AuthContext';
import MainTabs from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return user ? <MainTabs /> : <AuthNavigator />;
};

export default AppNavigator;
