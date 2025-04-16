import React, {useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
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
import Tabs from '../common/Tabs';
import {Appbar, Card, Chip, SegmentedButtons} from 'react-native-paper';
import EventDetailsHeader from './eventDetails/EventDetailsHeader';
import {useGetEventByIdQuery} from '../../store/slices/eventApiSlice';
import LoadingSpinner from '../common/LoadingSpinner';

interface EventDetailsScreenProps {
  route: EventDetailsScreenRouteProp;
}

const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({route}) => {
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {event} = route.params;
  const {
    data: eventDetails = {} as Event_,
    isFetching,
    isLoading,
    refetch,
  } = useGetEventByIdQuery(event.id);
  const [activeTab, setActiveTab] = useState<string>('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <Overview event={eventDetails!} />;
      case 'contributions':
        return <Contributors eventId={event.id} refetch={refetch} />;
      case 'expenses':
        return <Expenses eventId={event.id} refetch={refetch} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title={event.title} />
      <Card style={{minHeight: '100%'}}>
        <Card.Content>
          <EventDetailsHeader event={event} />
          <SegmentedButtons
            value={activeTab}
            onValueChange={setActiveTab}
            buttons={[
              {
                value: 'details',
                label: 'Overview',
              },
              {
                value: 'contributions',
                label: 'Contributor',
              },
              {value: 'expenses', label: 'Expense'},
            ]}
          />
          {renderTabContent()}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    // flex: 1,
  },
  profilePicture: {
    width: '100%',
    // height: 200,
    // resizeMode: 'cover',
    borderRadius: 0,
    marginBottom: 12,
  },
});

export default EventDetailsScreen;
