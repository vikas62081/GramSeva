import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Event_, EventsScreenNavigationProp} from './types';

import {formatDate, getTime} from '../../utils';
import Container from '../common/Container';
import {useGetEventsQuery} from '../../store/slices/eventApiSlice';
import EmptyComponent from '../common/EmptyComponent';
import {Appbar, Card, IconButton, Text} from 'react-native-paper';
import LazyLoader from '../common/LazyLoader';
import usePagination from '../../hooks/usePagination';
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
  const {page, search} = paginationState;
  const {
    data: events = initialValues,
    isLoading,
    isFetching,
    refetch,
  } = useGetEventsQuery({page});

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
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Events" />
        <Appbar.Action icon="search" onPress={() => {}} />
        <Appbar.Action
          icon="add"
          mode="contained"
          onPress={() => navigation.navigate('EventForm', {})}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <LazyLoader loading={isLoading && page === 1}>
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
    </Container>
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
