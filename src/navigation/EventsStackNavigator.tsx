import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventForm from '../components/events/eventDetails/EventForm';
import EventDetailsScreen from '../components/events/EventDetailsScreen';
import EventContainer from '../components/events';
import {RootStackParamList} from '../components/events/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Events" component={EventContainer} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="EventForm" component={EventForm} />
    </Stack.Navigator>
  );
};

export default EventStack;
