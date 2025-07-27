import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './HomeStackNavigator';
import EventStack from './EventsStackNavigator';
import FamilyStack from './FamilyStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import DebugScreen from '../components/DebugScreen';

const Tab = createBottomTabNavigator();

const screens = [
  {name: 'Home', component: HomeStackNavigator, icon: 'home-variant'},
  {name: 'Events', component: EventStack, icon: 'calendar-star'},
  {name: 'Family', component: FamilyStack, icon: 'account-group'},
  {name: 'Profile', component: ProfileStackNavigator, icon: 'account-circle'},
];

if (__DEV__) {
  screens.push({
    name: 'Debug',
    component: DebugScreen,
    icon: 'bug',
  });
}

const BottomTabNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surface,
        },
      }}>
      {screens.map(({name, component, icon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
