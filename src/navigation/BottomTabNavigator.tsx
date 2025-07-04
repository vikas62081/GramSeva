import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GramSeva from '../components/GramSeva';
import PollingStack from './PollsStackNavigator';
import NoticeListing from '../components/noticeboard';

import EventStack from './EventsStackNavigator';
import FamilyStack from './FamilyStackNavigator';
import {useTheme} from 'react-native-paper';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'Home',
    component: require('../components/Home').default,
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
  {name: 'Profile', component: ProfileScreen, icon: 'person', hidden: false},
];

const MainTabs = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
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
