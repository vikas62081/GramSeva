import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="Users" component={UsersScreen} />
    <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
  </Stack.Navigator>
);

export default ProfileStackNavigator;
