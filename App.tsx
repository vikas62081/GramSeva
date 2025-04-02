import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GramSeva from './components/GramSeva';
import PollingContainer from './components/polling';
import CreatePoll from './components/polling/CreatePoll';
import VotingScreen from './components/polling/VotingScreen';
import NoticeListing from './components/noticeboard';
import EventStack from './components/events';
import FamilyTree from './components/family/Listing';

// Enable screens for better performance
enableScreens();

// Create Stack Navigator for Polling
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Polling Stack Navigator
const PollingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PollingList" component={PollingContainer} />
      <Stack.Screen name="CreatePoll" component={CreatePoll} />
      <Stack.Screen name="VotingScreen" component={VotingScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: '#fff', paddingBottom: 5, height: 60},
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName = 'home'; // Default icon
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Polls') iconName = 'list';
          else if (route.name === 'Notifications') iconName = 'notifications';
          else if (route.name === 'Events') iconName = 'event';
          else if (route.name === 'Family') iconName = 'group';
          else if (route.name === 'Profile') iconName = 'person';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}>
      <Tab.Screen name="Home" component={GramSeva} />
      <Tab.Screen name="Polls" component={PollingStack} />
      <Tab.Screen name="Notifications" component={NoticeListing} />
      <Tab.Screen name="Events" component={EventStack} />
      <Tab.Screen name="Family" component={FamilyTree} />
      <Tab.Screen name="Profile" component={GramSeva} />
    </Tab.Navigator>
  );
};

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        /> */}
        <SafeAreaView style={[backgroundStyle, styles.container]}>
          <MainTabs />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
