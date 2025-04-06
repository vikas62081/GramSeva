import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export interface Event_ {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  eventHead: string;
  profilePicture: string;
  contributors: Contributor[];
  expenses: Expense[];
}

export interface Contributor {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface ContributorForm {
  name: string;
  amount: string;
}

export interface ContributorsProps {
  contributors: Contributor[];
  onAddContributor: (data: {name: string; amount: number}) => void;
  onEditContributor: (contributor: Contributor) => void;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  receipt: string;
  date: string;
}

export interface ExpenseForm {
  name: string;
  amount: string;
  receipt: string;
}

export interface ExpensesProps {
  event: Event_;
  onAddExpense: (data: {name: string; amount: number; receipt: string}) => void;
  onEditExpense: (expense: Expense) => void;
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
