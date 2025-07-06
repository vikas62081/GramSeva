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
  const {user} = useAuth();

  return user ? <MainTabs /> : <AuthNavigator />;
};

export default AppNavigator;
