import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Expense} from '../../types';
import ExpenseForm from './ExpenseForm';
import {formatDate} from '../../../../utils';
import {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from '../../../../store/slices/eventApiSlice';

export interface ExpensesProps {
  eventId: string;
}

const Expenses: React.FC<ExpensesProps> = ({eventId}) => {
  const {
    data: expenses,
    isLoading,
    error,
    isFetching,
  } = useGetExpensesQuery(eventId);
  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();

  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const handleSubmit = (data: Expense) => {
    if (selectedExpense) {
      updateExpense({eventId, expenseId: selectedExpense.id!, expense: data});
    } else {
      addExpense({eventId, expense: data});
    }
    setShowForm(false);
    setSelectedExpense(undefined);
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  const renderItem = ({item}: {item: Expense}) => (
    <TouchableOpacity
      onPress={() => {
        handleEdit(item);
      }}
      style={styles.expenseCard}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="credit-card" size={28} color="#63C7A6" />
      </View>
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseName}>{item.item}</Text>
        <Text style={styles.expenseDate}>{formatDate(item.created_at!)}</Text>
      </View>
      <Text style={styles.expenseAmount}>₹{item.cost}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedExpense(undefined);
            setShowForm(true);
          }}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ActivityIndicator animating={isFetching || isLoading} />
      <FlatList
        data={expenses || []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <ExpenseForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedExpense(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedExpense}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseInfo: {
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B2E6D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseDate: {
    fontSize: 13,
    color: '#777',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC3545',
  },
});

export default Expenses;
