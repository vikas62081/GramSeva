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
import {EventsScreenNavigationProp} from '../../types/navigation';
import EventDetailsScreen from './EventDetailsScreen';
import EventForm from './eventDetails/EventForm';
import {Event} from './types';
import {RootStackParamList} from '../../types/navigation';

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
    profilePicture: 'https://example.com/temple-festival.jpg',
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
    profilePicture: 'https://example.com/sports-day.jpg',
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('EventForm', {})}>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  createButton: {
    backgroundColor: '#6C63FF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: '#4a4a4a',
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
