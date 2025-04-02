import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Event} from '../components/events/types';

export interface Poll {
  id: string;
  question: string;
  options: string[];
  startDate: Date;
  endDate: Date;
  votes: number;
}

export type RootStackParamList = {
  Home: undefined;
  Polls: undefined;
  Notifications: undefined;
  Profile: undefined;
  Events: undefined;
  EventDetails: {event: Event};
  EventForm: {event?: Event};
};

export type PollingStackParamList = {
  PollingList: undefined;
  CreatePoll: undefined;
  VotingScreen: {poll: Poll};
};

export type RootTabNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type PollingStackNavigationProp =
  NativeStackNavigationProp<PollingStackParamList>;

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
