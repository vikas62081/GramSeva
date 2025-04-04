import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventsScreenNavigationProp} from '../../../types/navigation';
import EventDetailsScreen from './EventDetailsScreen';
import EventForm from './eventDetails/EventForm';
import {Event} from './types';
import {RootStackParamList} from '../../../types/navigation';
import TabHeader from '../common/TabHeader';
import {formatDate} from '../../utils';

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Temple Festival',
    description:
      'Annual celebration with cultural programs and community feast',
    date: new Date('2024-04-15').toISOString(),
    time: '9:00 AM - 9:00 PM',
    venue: 'Village Temple Ground',
    eventHead: 'Ram Kumar',
    profilePicture:
      'https://dims.apnews.com/dims4/default/c90f053/2147483647/strip/true/crop/4500x3001+0+0/resize/2046x1364!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F8f%2F90%2F7895d6e91470dba7c6ccb2d5a4da%2F5a9cb53123a84899a0f3b7a9dc9cc2a5',
    contributors: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        amount: 5000,
        date: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Priya Sharma',
        amount: 3000,
        date: new Date().toISOString(),
      },
    ],
    expenses: [
      {
        id: '1',
        name: 'Food Materials',
        amount: 8000,
        receipt: 'receipt1.jpg',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Decoration',
        amount: 5000,
        receipt: 'receipt2.jpg',
        date: new Date().toISOString(),
      },
    ],
  },
  {
    id: '2',
    title: 'Youth Sports Day',
    description: 'Annual sports competition for village youth',
    date: new Date('2024-04-20').toISOString(),
    time: '8:00 AM - 5:00 PM',
    venue: 'Village Sports Ground',
    eventHead: 'Amit Singh',
    profilePicture:
      'https://duendebymadamzozo.com/dbmzz-content/uploads/2024/03/Holi-Indian-Festival-of-Colours.jpg',
    contributors: [
      {
        id: '3',
        name: 'Sunil Verma',
        amount: 2000,
        date: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Meera Patel',
        amount: 1500,
        date: new Date().toISOString(),
      },
    ],
    expenses: [
      {
        id: '3',
        name: 'Sports Equipment',
        amount: 3000,
        receipt: 'receipt3.jpg',
        date: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Refreshments',
        amount: 2000,
        receipt: 'receipt4.jpg',
        date: new Date().toISOString(),
      },
    ],
  },
];

const EventContainer = (): React.JSX.Element => {
  const navigation = useNavigation<EventsScreenNavigationProp>();

  const handleAddEvent = (
    eventData: Omit<Event, 'id' | 'contributors' | 'expenses'>,
  ) => {
    // TODO: Implement add event logic
    console.log('Add event:', eventData);
  };

  const handleEditEvent = (event: Event) => {
    // TODO: Implement edit event logic
    console.log('Edit event:', event);
  };

  const renderEventItem = ({item}: {item: Event}) => {
    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails', {event: item})}>
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </View>
          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.footerRow}>
            <View style={styles.dateContainer}>
              <MaterialIcons name="event" size={16} color="#666" />
              <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
            <View style={styles.timeContainer}>
              <MaterialIcons name="schedule" size={16} color="#666" />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TabHeader
        title="Events"
        onAdd={() => navigation.navigate('EventForm', {})}
      />
      <FlatList
        data={sampleEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
  },
  listContainer: {
    gap: 16,
    paddingBottom: 80,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  time: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

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
