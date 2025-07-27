import React from 'react';
import {useAuth} from '../context/AuthContext';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../components/common/SplashScreen';

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return user ? <BottomTabNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
