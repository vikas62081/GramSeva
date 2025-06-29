import React, {useState, useCallback} from 'react';
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
import {Card, IconButton, Surface, Text} from 'react-native-paper';
import LazyLoader from '../common/LazyLoader';
import SearchHeader from '../common/SearchHeader';
import EventForm from './eventDetails/EventForm';
import LoadMoreButton from '../common/LoadMoreButton';
import {usePaginatedList} from '../../hooks/usePaginatedList';

const EventContainer = (): React.JSX.Element => {
  const navigation = useNavigation<EventsScreenNavigationProp>();

  // State management
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Use the paginated list hook
  const {
    data: events,
    isLoading,
    isFetching,
    isRefreshing,
    searchQuery,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages,
    refetch,
  } = usePaginatedList<Event_>({
    queryHook: useGetEventsQuery,
    limit: 10,
  });

  // Handle event added
  const handleEventAdded = useCallback(async () => {
    await refetch();
  }, [refetch]);

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
  if (isLoading && events.length === 0) {
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
          data={events}
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
