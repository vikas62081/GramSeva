import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import type {
  Event,
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
  const [showAddContributor, setShowAddContributor] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newContributor, setNewContributor] = useState({name: '', amount: ''});
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    receipt: '',
  });

  const calculateTotalContributions = () => {
    return event.contributors.reduce(
      (sum, contributor) => sum + contributor.amount,
      0,
    );
  };

  const calculateTotalExpenses = () => {
    return event.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getHighestContributor = () => {
    if (event.contributors.length === 0) return null;
    return event.contributors.reduce((max, current) =>
      current.amount > max.amount ? current : max,
    );
  };

  const handleAddContributor = (data: {name: string; amount: number}) => {
    // TODO: Implement add contributor logic
    console.log('Add contributor:', data);
  };

  const handleEditContributor = (contributor: Contributor) => {
    // TODO: Implement edit contributor logic
    console.log('Edit contributor:', contributor);
  };

  const handleAddExpense = (data: {
    name: string;
    amount: number;
    receipt: string;
  }) => {
    // TODO: Implement add expense logic
    console.log('Add expense:', data);
  };

  const handleEditExpense = (expense: Expense) => {
    // TODO: Implement edit expense logic
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
        {/* Event Profile Picture */}
        <Image
          source={{
            uri: event.profilePicture,
          }}
          style={styles.profilePicture}
        />

        {/* Tab Navigation */}
        <View>
          <Tabs
            tabs={['details', 'contributions', 'expenses']}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />
          {renderTabContent()}
        </View>
        {/* Content based on active tab */}
      </ScrollView>

      {/* Add Contributor Modal */}
      <Modal
        visible={showAddContributor}
        transparent={true}
        animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.formModal}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Add Contributor</Text>
              <TouchableOpacity
                onPress={() => setShowAddContributor(false)}
                style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.formContent}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={newContributor.name}
                onChangeText={text =>
                  setNewContributor(prev => ({...prev, name: text}))
                }
                placeholder="Enter contributor name"
              />
              <Text style={styles.formLabel}>Amount</Text>
              <TextInput
                style={styles.input}
                value={newContributor.amount}
                onChangeText={text =>
                  setNewContributor(prev => ({...prev, amount: text}))
                }
                placeholder="Enter amount"
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() =>
                  handleAddContributor({
                    name: newContributor.name,
                    amount: parseFloat(newContributor.amount),
                  })
                }>
                <Text style={styles.submitButtonText}>Add Contributor</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Expense Modal */}
      <Modal visible={showAddExpense} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.formModal}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Add Expense</Text>
              <TouchableOpacity
                onPress={() => setShowAddExpense(false)}
                style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.formContent}>
              <Text style={styles.formLabel}>Expense Name</Text>
              <TextInput
                style={styles.input}
                value={newExpense.name}
                onChangeText={text =>
                  setNewExpense(prev => ({...prev, name: text}))
                }
                placeholder="Enter expense name"
              />
              <Text style={styles.formLabel}>Amount</Text>
              <TextInput
                style={styles.input}
                value={newExpense.amount}
                onChangeText={text =>
                  setNewExpense(prev => ({...prev, amount: text}))
                }
                placeholder="Enter amount"
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() =>
                  handleAddExpense({
                    name: newExpense.name,
                    amount: parseFloat(newExpense.amount),
                    receipt: newExpense.receipt,
                  })
                }>
                <Text style={styles.submitButtonText}>Add Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  formContent: {
    padding: 16,
  },
  formLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#63C7A6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default EventDetailsScreen;
