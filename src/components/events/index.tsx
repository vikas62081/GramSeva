import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Event_, EventsScreenNavigationProp} from './types';

import {formatDate, getTime} from '../../utils';
import {useGetEventsQuery} from '../../store/slices/eventApiSlice';
import EmptyComponent from '../common/EmptyComponent';
import {Appbar, Card, IconButton, Surface, Text} from 'react-native-paper';
import LazyLoader from '../common/LazyLoader';
import usePagination from '../../hooks/usePagination';
import EventForm from './eventDetails/EventForm';
const initialValues = {data: [], total_count: 0, total_pages: 0, page: 1};

const EventContainer = (): React.JSX.Element => {
  const navigation = useNavigation<EventsScreenNavigationProp>();
  const {
    setData,
    paginationState,
    updatePage,
    updateSearch,
    data: allEvents,
    updateData,
  } = usePagination<Event_>();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const {page, search} = paginationState;
  const {
    data: events = initialValues,
    isLoading,
    isFetching,
    refetch,
  } = useGetEventsQuery({page, limit: 8});

  useEffect(() => {
    if (events) {
      updateData(events.data);
    }
  }, [events]);

  const handleLoadMore = () => {
    const {total_pages = -1, page: currentPage} = events;
    if (!isFetching && page < total_pages) {
      updatePage(page);
    }
  };

  const onEventAdded = () => {
    setData([]);
    updatePage(0);
    if (page == 1) {
      refetch();
    }
  };

  // const debouncedSearch = useCallback(
  //   debounce(term => {
  //     updateSearch(term);
  //   }, 500),
  //   [],
  // );

  const renderEventItem = ({item}: {item: Event_}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetails', {event: item})}>
      <Card mode="contained">
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
  );

  return (
    <Surface style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Content title="Events" />
        <Appbar.Action icon="search" onPress={() => {}} />
        <Appbar.Action
          icon="add"
          mode="contained"
          onPress={() => setIsAddingEvent(true)}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <LazyLoader loading={isLoading || isFetching || allEvents.length == 0}>
          <FlatList
            data={allEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyComponent msg="No events found." />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        </LazyLoader>
      </View>
      {isAddingEvent && (
        <EventForm
          onSuccess={onEventAdded}
          onClose={() => setIsAddingEvent(false)}
        />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 80,
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
