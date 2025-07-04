import React, {useState, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GramSeva from '../components/GramSeva';
import PollingStack from './PollsStackNavigator';
import NoticeListing from '../components/noticeboard';
import EventStack from './EventsStackNavigator';
import FamilyStack from './FamilyStackNavigator';
import Home from '../components/Home';

// Helper: List of route names where tab bar should be hidden
const HIDE_TAB_ROUTES = [
  'FamilyDetails',
  'EventDetails',
  'PollDetails',
  'NoticeDetails',
  // Add more detail screen names as needed
];

const tabScreens = [
  {
    key: 'home',
    title: 'Home',
    focusedIcon: 'home',
  },
  {
    key: 'events',
    title: 'Events',
    focusedIcon: 'event',
  },
  {
    key: 'famillies',
    title: 'Family',
    focusedIcon: 'group',
  },
];

type PaperBottomNavigationProps = {
  navigation?: any;
  route?: any;
};

function PaperBottomNavigation({
  navigation,
  route,
}: PaperBottomNavigationProps) {
  // Determine which tab is active based on route or state
  const [index, setIndex] = useState(0);

  // Hide bottom nav if on a details screen
  const currentRoute =
    route?.state?.routes?.[route.state.index] || route?.params?.screen || '';
  let hideTab = false;
  if (typeof currentRoute === 'object' && currentRoute.name) {
    hideTab = HIDE_TAB_ROUTES.includes(currentRoute.name);
  } else if (typeof currentRoute === 'string') {
    hideTab = HIDE_TAB_ROUTES.includes(currentRoute);
  }

  const routes = useMemo(() => tabScreens, []);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    events: EventStack,
    famillies: FamilyStack,
  });

  if (hideTab) {
    // Only render the current scene, no bottom nav
    // const Scene = tabScreens[index].component;
    // return <Scene />;
  }

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bar}
      // shifting={false}
      sceneAnimationEnabled={false}
      labeled
      compact
    />
  );
}

const styles = StyleSheet.create({
  bar: {
    // backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderTopColor: '#eee',
    // elevation: 8,
    // height: 60,
  },
});

export default PaperBottomNavigation;
