import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../components/Home';
import EventDetailsScreen from '../components/events/EventDetailsScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Dashboard" component={Home} />
    <Stack.Screen name="LatestEvent" component={EventDetailsScreen} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
