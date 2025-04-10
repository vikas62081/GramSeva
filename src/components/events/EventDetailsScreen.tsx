import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {
  EventDetailsScreenNavigationProp,
  EventDetailsScreenRouteProp,
  Expense,
} from './types';
import Overview from './eventDetails/Overview';
import Contributors from './eventDetails/contributors/Contributors';
import Expenses from './eventDetails/expenses/Expenses';
import PageHeader from '../common/PageHeader';
import Tabs from '../common/Tabs';

interface EventDetailsScreenProps {
  route: EventDetailsScreenRouteProp;
}

const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({route}) => {
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {event} = route.params;
  const [activeTab, setActiveTab] = useState<string>('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <Overview event={event} />;
      case 'contributions':
        return <Contributors eventId={event.id} />;
      case 'expenses':
        return <Expenses eventId={event.id} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title={event.title} />

      <Image
        source={{uri: event.thumbnail_url}}
        style={styles.profilePicture}
      />
      <View style={styles.content}>
        <Tabs
          tabs={['details', 'contributions', 'expenses']}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  profilePicture: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default EventDetailsScreen;
