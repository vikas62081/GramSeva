import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// Define the parameter list for the entire stack
export type RootStackParamList = {
  FamilyList: undefined; // No params needed for the FamilyList screen
  FamilyDetails: {familyId: string}; // Pass params to FamilyDetails screen (familyId)

  Events: undefined;
  EventDetails: {event: Event};
  EventForm: {event?: Event};
};

// Define the navigation prop for the FamilyList screen
export type FamilyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FamilyList'
>;

// Define the navigation prop for the FamilyDetails screen
export type FamilyDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FamilyDetails'
>;

// Define the route prop for the FamilyDetails screen (for access to route params)
export type FamilyDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'FamilyDetails'
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
