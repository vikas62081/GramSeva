import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Expense} from '../../types';
import ExpenseForm from './ExpenseForm';
import {formatDate} from '../../../../utils';
import {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';
import {Avatar, Button, Card, Divider, List, Text} from 'react-native-paper';

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

  const [addExpense, {isLoading: isAdding}] = useAddExpenseMutation();
  const [updateExpense, {isLoading: isUpdating}] = useUpdateExpenseMutation();

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
    <TouchableOpacity onPress={() => handleEdit(item)}>
      <List.Item
        title={item.item}
        description={formatDate(item.created_at!)}
        left={props => <Avatar.Icon size={40} icon="credit-card" />}
        right={() => <Text style={styles.amountText}>₹{item.cost}</Text>}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header}>
        <Text variant="titleMedium">Expenses</Text>
        <Button
          icon="add"
          mode="contained-tonal"
          onPress={() => {
            setSelectedExpense(undefined);
            setShowForm(true);
          }}>
          Add
        </Button>
      </View>

      <ActivityIndicator animating={isLoading || isFetching} />

      <FlatList
        data={expenses || []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyComponent msg="No expense found." />}
      />

      <ExpenseForm
        visible={showForm}
        isLoading={isAdding || isUpdating}
        onClose={() => {
          setShowForm(false);
          setSelectedExpense(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedExpense}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  amountText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#DC3545',
  },
});

export default Expenses;
