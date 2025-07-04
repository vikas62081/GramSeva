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
    user_id: string;
    name: string;
  };
  thumbnail_url: string;
  total_contribution?: number;
  total_expenditure?: number;
  top_contributor?: {
    user_id: string;
    name: string;
    amount: number;
    transaction_id: string;
  };
}

export interface Contributor {
  id?: string;
  name: string;
  amount: number;
  user_id: string;
  created_at?: string;
}

export interface IContributorForm {
  user_id?: string;
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
  EventContainer: undefined;
  EventDetails: {event: Event_};
  ContributorsList: {eventId: string; eventTitle: string};
  ExpensesList: {eventId: string; eventTitle: string};
  FamilyHeadSelector: {title?: string; people?: {id: string; name: string}[]};
  FamilyMemberSelector: {
    title?: string;
    members?: {id: string; name: string}[];
  };
};

export type EventsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventContainer'
>;

export type EventDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventDetails'
>;

export type EventDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetails'
>;

export type ContributorsListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ContributorsList'
>;

export type ContributorsListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ContributorsList'
>;

export type ExpensesListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExpensesList'
>;

export type ExpensesListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExpensesList'
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
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Event_;
}
