import React, {useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {
  EventDetailsScreenNavigationProp,
  EventDetailsScreenRouteProp,
} from './types';
import Overview from './eventDetails/Overview';
import Contributors from './eventDetails/contributors/Contributors';
import Expenses from './eventDetails/expenses/Expenses';
import PageHeader from '../common/PageHeader';
import Tabs from '../common/Tabs';
import {Card, SegmentedButtons} from 'react-native-paper';

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={{minHeight: '100%'}}>
          <Card.Cover
            style={styles.profilePicture}
            source={{uri: event.thumbnail_url}}
          />
          <Card.Content>
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
      </ScrollView>
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
    // height: 200,
    // resizeMode: 'cover',
    borderRadius: 0,
    marginBottom: 12,
  },
});

export default EventDetailsScreen;
