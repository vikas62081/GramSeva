import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import NewUsersScreen from '../screens/NewUsersScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import FamilyDetailsScreen from '../screens/FamilyDetails';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="NewUsers" component={NewUsersScreen} />
    <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
    <Stack.Screen name="MyFamilyDetails" component={FamilyDetailsScreen} />
  </Stack.Navigator>
);

export default ProfileStackNavigator;
