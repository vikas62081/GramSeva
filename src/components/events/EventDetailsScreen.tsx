import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {
  EventDetailsScreenNavigationProp,
  EventDetailsScreenRouteProp,
  Contributor,
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

  const handleAddContributor = (data: {name: string; amount: number}) => {
    console.log('Add contributor:', data);
  };

  const handleEditContributor = (contributor: Contributor) => {
    console.log('Edit contributor:', contributor);
  };

  const handleAddExpense = (data: {
    name: string;
    amount: number;
    receipt: string;
  }) => {
    console.log('Add expense:', data);
  };

  const handleEditExpense = (expense: Expense) => {
    console.log('Edit expense:', expense);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <Overview event={event} />;
      case 'contributions':
        return (
          <Contributors
            contributors={event.contributors}
            onAddContributor={handleAddContributor}
            onEditContributor={handleEditContributor}
          />
        );
      case 'expenses':
        return (
          <Expenses
            event={event}
            onAddExpense={handleAddExpense}
            onEditExpense={handleEditExpense}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title={event.title} />
      <ScrollView style={styles.content}>
        <Image
          source={{uri: event.profilePicture}}
          style={styles.profilePicture}
        />
        <View>
          <Tabs
            tabs={['details', 'contributions', 'expenses']}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />
          {renderTabContent()}
        </View>
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
    height: 200,
    resizeMode: 'cover',
  },
});

export default EventDetailsScreen;
