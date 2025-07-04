import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Expense, EventDetailsScreenNavigationProp} from '../../types';
import ExpenseForm from './ExpenseForm';
import {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';
import {Button, Divider, FAB, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LazyLoader from '../../../common/LazyLoader';
import {useSnackbar} from '../../../../context/SnackbarContext';
import {useNavigation} from '@react-navigation/native';
import ExpenseItem from './ExpenseItem';
import {usePreviewList} from '../../../../hooks/usePreviewList';

export interface ExpensesProps {
  eventId: string;
  eventTitle?: string;
  refetch: () => void;
}

const Expenses: React.FC<ExpensesProps> = ({eventId, eventTitle, refetch}) => {
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {showSnackbar} = useSnackbar();

  // Use the preview list hook
  const {
    data: expenses,
    isLoading,
    isFetching,
  } = usePreviewList<Expense>({
    queryHook: useGetExpensesQuery,
    queryParams: {eventId},
    limit: 5,
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();

  const [addExpense, {isLoading: isAdding}] = useAddExpenseMutation();
  const [updateExpense, {isLoading: isUpdating}] = useUpdateExpenseMutation();

  const handleSubmit = async (data: Expense) => {
    try {
      let msg = 'Expense added successfully';
      if (selectedExpense) {
        await updateExpense({
          eventId,
          expenseId: selectedExpense.id!,
          expense: data,
        });
        msg = 'Expense updated successfully';
      } else {
        await addExpense({eventId, expense: data});
      }
      showSnackbar(msg);
      await refetch();
      setShowForm(false);
      setSelectedExpense(undefined);
    } catch (error) {
      showSnackbar('Error saving expense. Please try again.');
    }
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  const handleViewAll = () => {
    navigation.navigate('ExpensesList', {
      eventId,
      eventTitle: eventTitle || 'Event',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="receipt-long"
            size={20}
            color="#d32f2f"
            style={{marginRight: 6}}
          />
          <Text variant="titleMedium">Expenses</Text>
        </View>
        <Button
          onPress={handleViewAll}
          mode="text"
          compact
          accessibilityLabel="View all expenses">
          View All
        </Button>
      </View>

      <LazyLoader loading={isLoading || isFetching} position="top">
        <FlatList
          data={expenses}
          renderItem={({item}) => (
            <ExpenseItem item={item} onPress={handleEdit} />
          )}
          keyExtractor={item =>
            item.id ? String(item.id) : Math.random().toString()
          }
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={<EmptyComponent msg="No expense found." />}
          contentContainerStyle={expenses.length === 0 ? {flex: 1} : undefined}
        />
      </LazyLoader>
      <FAB
        icon="add"
        style={styles.fab}
        label=""
        onPress={() => {
          setSelectedExpense(undefined);
          setShowForm(true);
        }}
        size="small"
        color="white"
        accessibilityLabel="Add Expense"
      />
      {showForm && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    backgroundColor: '#6200ee',
    zIndex: 10,
  },
});

export default Expenses;
