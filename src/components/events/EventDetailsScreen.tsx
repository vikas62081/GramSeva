import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {
  EventDetailsScreenNavigationProp,
  EventDetailsScreenRouteProp,
  Event_,
} from './types';
import Overview from './eventDetails/Overview';
import Contributors from './eventDetails/contributors/Contributors';
import Expenses from './eventDetails/expenses/Expenses';
import PageHeader from '../common/PageHeader';
import {Card, SegmentedButtons, Surface} from 'react-native-paper';
import EventDetailsHeader from './eventDetails/EventDetailsHeader';
import {useGetEventByIdQuery} from '../../store/slices/eventApiSlice';
import {useHideTabBar} from '../../hooks/ useHideTabBar';
import EventForm from './eventDetails/EventForm';

const EventDetailsScreen: React.FC = ({route}: any) => {
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  useHideTabBar();
  const {event} = route.params;
  const {
    data: eventDetails = {} as Event_,
    isFetching,
    isLoading,
    refetch,
  } = useGetEventByIdQuery(event.id);
  const [activeTab, setActiveTab] = useState<string>('details');
  const [showEditForm, setShowEditForm] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <Overview event={eventDetails} loading={isFetching || isLoading} />
        );
      case 'contributors':
        return (
          <Contributors
            eventId={event.id}
            eventTitle={event.title}
            refetch={refetch}
          />
        );
      case 'expenses':
        return (
          <Expenses
            eventId={event.id}
            eventTitle={event.title}
            refetch={refetch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Surface style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title={event.title} />
      <Card style={styles.card}>
        <Card.Content>
          <EventDetailsHeader
            event={eventDetails}
            onEdit={() => {
              if (eventDetails && eventDetails.id) setShowEditForm(true);
            }}
          />
          <SegmentedButtons
            value={activeTab}
            onValueChange={setActiveTab}
            buttons={[
              {value: 'details', label: 'Overview'},
              {value: 'contributors', label: 'Contributors'},
              {value: 'expenses', label: 'Expenses'},
            ]}
            style={styles.segmentedButtons}
          />
        </Card.Content>
      </Card>
      <View style={styles.tabContent}>{renderTabContent()}</View>
      {showEditForm && eventDetails && eventDetails.id && (
        <EventForm
          initialData={eventDetails}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            setShowEditForm(false);
            refetch();
          }}
        />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  segmentedButtons: {
    marginTop: 8,
    marginBottom: 0,
  },
  tabContent: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});

export default EventDetailsScreen;
