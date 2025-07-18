import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GramSeva from '../components/GramSeva';
import PollingStack from './PollsStackNavigator';
import NoticeListing from '../components/noticeboard';

import EventStack from './EventsStackNavigator';
import FamilyStack from './FamilyStackNavigator';
import {useTheme} from 'react-native-paper';
import ProfileStackNavigator from './ProfileStackNavigator';
import DebugScreen from '../components/DebugScreen';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'Home',
    component: HomeStackNavigator,
    icon: 'home',
    hidden: false,
  },
  {name: 'Polls', component: PollingStack, icon: 'list', hidden: true},
  {
    name: 'Notifications',
    component: NoticeListing,
    icon: 'notifications',
    hidden: true,
  },
  {name: 'Events', component: EventStack, icon: 'event', hidden: false},
  {name: 'Family', component: FamilyStack, icon: 'group', hidden: false},
  {
    name: 'Profile',
    component: ProfileStackNavigator,
    icon: 'person',
    hidden: false,
  },
  {
    name: 'DEV ENV',
    component: DebugScreen,
    icon: 'developer-mode',
    hidden: !__DEV__,
  },
];

const MainTabs = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={({route}) => ({
        tabBarStyle: {height: 60},
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          const tab = tabScreens.find(tab => tab.name === route.name);
          return tab ? (
            <MaterialIcon name={tab.icon} size={size} color={color} />
          ) : null;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      })}>
      {tabScreens
        .filter(tab => !tab.hidden)
        .map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
    </Tab.Navigator>
  );
};

export default MainTabs;
