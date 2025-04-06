import React, {useState} from 'react';
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
import {Event_, EventsScreenNavigationProp} from './types';

import TabHeader from '../common/TabHeader';
import {formatDate} from '../../utils';
import Container from '../common/Container';
import {sampleEvents} from '../mock';

const EventContainer = (): React.JSX.Element => {
  const navigation = useNavigation<EventsScreenNavigationProp>();
  const [events, setEvents] = useState<Event_[]>(sampleEvents);

  const handleAddEvent = (
    eventData: Omit<Event_, 'id' | 'contributors' | 'expenses'>,
  ) => {
    const newEvent = {
      ...eventData,
      id: (events.length + 1).toString(),
      contributors: [],
      expenses: [],
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);

    console.log('Add event:', eventData);
  };

  const handleEditEvent = (event: Event_) => {
    // TODO: Implement edit event logic
    console.log('Edit event:', event);
  };

  const renderEventItem = ({item}: {item: Event_}) => {
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
    <Container>
      <TabHeader
        title="Events"
        onAdd={() => navigation.navigate('EventForm', {})}
      />
      <View style={styles.content}>
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
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

export default EventContainer;
