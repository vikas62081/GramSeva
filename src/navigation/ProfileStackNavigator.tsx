import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import NewUsersScreen from '../screens/NewUsersScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import FamilyDetailsScreen from '../screens/FamilyDetails';
import FamilyMemberSelector from '../components/common/FamilyMemberSelector';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="NewUsers" component={NewUsersScreen} />
    <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
    <Stack.Screen name="MyFamilyDetails" component={FamilyDetailsScreen} />
    <Stack.Screen
      name="FamilyMemberSelector"
      options={{animation: 'fade'}}
      component={FamilyMemberSelector}
    />
  </Stack.Navigator>
);

export default ProfileStackNavigator;
