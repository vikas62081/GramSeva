import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Event_, EventsScreenNavigationProp} from './types';

import {formatDate, getTime} from '../../utils';
import {useGetEventsQuery} from '../../store/slices/eventApiSlice';
import EmptyComponent from '../common/EmptyComponent';
import {Card, IconButton, Surface, Text, Button} from 'react-native-paper';
import LazyLoader from '../common/LazyLoader';
import SearchHeader from '../common/SearchHeader';
import EventForm from './eventDetails/EventForm';
import LoadMoreButton from '../common/LoadMoreButton';

interface AllEventsProps {
  data: Event_[] | undefined;
  total_count: number;
  total_pages: number;
  page: number;
}

const initialValues: AllEventsProps = {
  data: undefined,
  total_count: 0,
  total_pages: 0,
  page: 1,
};

const EventContainer = (): React.JSX.Element => {
  const navigation = useNavigation<EventsScreenNavigationProp>();

  // State management
  const [allEvents, setAllEvents] = useState<AllEventsProps>(initialValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // API query
  const {
    data: eventsResponse = initialValues,
    isLoading,
    isFetching,
    refetch,
  } = useGetEventsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery || undefined,
  });

  // Update local state when API response changes
  useEffect(() => {
    if (eventsResponse) {
      if (currentPage === 1) {
        setAllEvents(eventsResponse);
      } else {
        setAllEvents(prev => ({
          ...eventsResponse,
          data: [...(prev.data || []), ...(eventsResponse.data || [])],
        }));
      }
    }
  }, [eventsResponse]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  // Handle load more button
  const handleLoadMore = useCallback(() => {
    const {total_pages, page: responsePage} = allEvents;
    if (responsePage < total_pages) {
      setCurrentPage(responsePage + 1);
    }
  }, [allEvents]);

  // Handle event added
  const handleEventAdded = useCallback(async () => {
    setCurrentPage(1);
    await refetch();
  }, [refetch]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Check if there are more pages to load
  const hasMorePages = allEvents.page < allEvents.total_pages;

  // Render individual event item
  const renderEventItem = useCallback(
    ({item}: {item: Event_}) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetails', {event: item})}>
        <Card mode="contained" style={styles.eventCard}>
          <Card.Title
            titleVariant="titleMedium"
            title={item.title}
            subtitle={item.description}
            subtitleNumberOfLines={1}
            subtitleVariant="bodySmall"
            titleNumberOfLines={1}
            right={props => (
              <IconButton {...props} icon="chevron-right" onPress={() => {}} />
            )}
          />
          <Card.Content>
            <View style={styles.footerRow}>
              <View style={styles.dateContainer}>
                <MaterialIcons name="event" size={16} color="#666" />
                <Text variant="labelMedium">{formatDate(item.date)}</Text>
              </View>
              <View style={styles.timeContainer}>
                <MaterialIcons name="schedule" size={16} color="#666" />
                <Text variant="labelMedium">{getTime(item.date)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ),
    [navigation],
  );

  // Show loading screen for initial load
  if (isLoading && allEvents.data?.length === 0) {
    return (
      <Surface style={styles.container}>
        <SearchHeader
          title="Events"
          onSearch={handleSearch}
          onAdd={() => setIsAddingEvent(true)}
          placeholder="Search events..."
          isFetching={isFetching}
        />
        <View style={styles.content}>
          <LazyLoader loading={true}>
            <View />
          </LazyLoader>
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <SearchHeader
        title="Events"
        onSearch={handleSearch}
        onAdd={() => setIsAddingEvent(true)}
        placeholder="Search events..."
        isFetching={isFetching}
      />

      <View style={styles.content}>
        <FlatList
          data={allEvents.data || []}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            isLoading || isFetching ? (
              <View style={styles.loadingContainer}>
                <LazyLoader loading={true}>
                  <View />
                </LazyLoader>
              </View>
            ) : (
              <EmptyComponent
                msg={
                  searchQuery
                    ? `No events found for "${searchQuery}"`
                    : 'No events found.'
                }
              />
            )
          }
          ListFooterComponent={
            <LoadMoreButton
              onPress={handleLoadMore}
              isLoading={isFetching}
              disabled={isFetching}
              hasMoreData={hasMorePages}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#6200ee']}
              tintColor="#6200ee"
            />
          }
        />
      </View>

      {isAddingEvent && (
        <EventForm
          onSuccess={handleEventAdded}
          onClose={() => setIsAddingEvent(false)}
        />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContainer: {
    gap: 12,
    // paddingBottom: 60,
  },
  eventCard: {
    // marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default EventContainer;
