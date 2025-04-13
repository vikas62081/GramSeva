import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export interface Event_ {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  eventHead: {
    id: string;
    name: string;
  };
  thumbnail_url: string;
  contributors: Contributor[];
  expenses: Expense[];
}

export interface Contributor {
  id?: string;
  name: string;
  amount: number;
  user_id: string;
  created_at?: string;
}

export interface ContributorForm {
  name: string;
  amount: string;
}

export interface Expense {
  id: string;
  item: string;
  cost: number;
  receipt_url: string;
  created_at?: string;
}

export interface ExpenseForm {
  name: string;
  amount: string;
  receipt: string;
}

export interface OverviewProps {
  event: Event_;
}

export type RootStackParamList = {
  Events: undefined;
  EventDetails: {event: Event_};
  EventForm: {event?: Event_};
};

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

export interface FormModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  submitText: string;
  children: React.ReactNode;
  isLoading: boolean;
}

export interface EventContainerProps {
  events: Event_[];
  onAddEvent: (event: Omit<Event_, 'id' | 'contributors' | 'expenses'>) => void;
  onEditEvent: (event: Event_) => void;
}

export interface EventDetailsScreenProps {
  route: EventDetailsScreenRouteProp;
  navigation: EventDetailsScreenNavigationProp;
}

export interface EventFormScreenProps {
  route: EventFormScreenRouteProp;
  navigation: EventFormScreenNavigationProp;
}
