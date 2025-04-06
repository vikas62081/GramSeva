import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GramSeva from '../components/GramSeva';
import PollingStack from './PollsStackNavigator';
import NoticeListing from '../components/noticeboard';

import EventStack from './EventsStackNavigator';
import FamilyStack from './FamilyStackNavigator';

const Tab = createBottomTabNavigator();

// Tab configuration array
const tabScreens = [
  {name: 'Home', component: GramSeva, icon: 'home', hidden: true},
  {name: 'Polls', component: PollingStack, icon: 'list', hidden: true},
  {
    name: 'Notifications',
    component: NoticeListing,
    icon: 'notifications',
    hidden: true,
  },
  {name: 'Events', component: EventStack, icon: 'event', hidden: false},
  {name: 'Family', component: FamilyStack, icon: 'group', hidden: false},
  {name: 'Profile', component: GramSeva, icon: 'person', hidden: true},
];

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: '#fff', paddingBottom: 5, height: 60},
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          const tab = tabScreens.find(tab => tab.name === route.name);
          return tab ? (
            <MaterialIcon name={tab.icon} size={size} color={color} />
          ) : null;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}>
      {tabScreens
        .filter(tab => !tab.hidden) // Exclude hidden tabs
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
