import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventDetailsScreen from '../components/events/EventDetailsScreen';
import EventContainer from '../components/events';
import ContributorsListScreen from '../components/events/eventDetails/contributors/ContributorsListScreen';
import ExpensesListScreen from '../components/events/eventDetails/expenses/ExpensesListScreen';
import {RootStackParamList} from '../components/events/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EventContainer" component={EventContainer} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen
        name="ContributorsList"
        component={ContributorsListScreen}
      />
      <Stack.Screen name="ExpensesList" component={ExpensesListScreen} />
    </Stack.Navigator>
  );
};

export default EventStack;
