import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// Define the parameter list for the entire stack
export type RootStackParamList = {
  PeopleList: undefined; // No params needed for the PeopleList screen
  PeopleDetails: {familyId: string}; // Pass params to PeopleDetails screen (familyId)

  Events: undefined;
  EventDetails: {event: Event};
  EventForm: {event?: Event};
};

// Define the navigation prop for the PeopleList screen
export type PeopleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleList'
>;

// Define the navigation prop for the PeopleDetails screen
export type PeopleDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleDetails'
>;

// Define the route prop for the PeopleDetails screen (for access to route params)
export type PeopleDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PeopleDetails'
>;

export type EventsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Events'
>;

export type EventDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventDetails'
>;

export type EventFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventForm'
>;

export type EventDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetails'
>;

export type EventFormScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventForm'
>;
