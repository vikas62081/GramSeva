import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  PeopleList: undefined;
  PeopleDetails: {familyId: string};
};

export type PeopleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleList'
>;

export type PeopleDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleDetails'
>;

export type PeopleDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PeopleDetails'
>;
