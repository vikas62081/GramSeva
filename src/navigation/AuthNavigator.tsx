import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AuthContainer from '../components/auth/AuthContainer';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login">
      {props => (
        <AuthContainer>
          <LoginScreen {...props} />
        </AuthContainer>
      )}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {props => (
        <AuthContainer>
          <RegisterScreen {...props} />
        </AuthContainer>
      )}
    </Stack.Screen>
    <Stack.Screen name="ForgotPassword">
      {props => (
        <AuthContainer>
          <ForgotPasswordScreen {...props} />
        </AuthContainer>
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthNavigator;
