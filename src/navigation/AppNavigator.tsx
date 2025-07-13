import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import MainTabs from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import LoadingScreen from '../components/common/LoadingScreen';
import SplashScreen from '../components/common/SplashScreen';

const AppNavigator = () => {
  const {user, loading} = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <MainTabs /> : <AuthNavigator />;
};

export default AppNavigator;
