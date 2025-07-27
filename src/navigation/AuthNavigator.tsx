import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import Box from '../ui/components/Box';

const AuthNavigator = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <LoginScreen />
  </Box>
);

export default AuthNavigator;
