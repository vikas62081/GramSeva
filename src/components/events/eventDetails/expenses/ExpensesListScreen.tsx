import React, {useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {Surface, Divider} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Expense, ExpensesListScreenRouteProp} from '../../types';
import {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';
import LazyLoader from '../../../common/LazyLoader';
import SearchHeader from '../../../common/SearchHeader';
import ExpenseForm from './ExpenseForm';
import {useSnackbar} from '../../../../context/SnackbarContext';
import ExpenseItem from './ExpenseItem';
import LoadMoreButton from '../../../common/LoadMoreButton';
import {usePaginatedList} from '../../../../hooks/usePaginatedList';

const ExpensesListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ExpensesListScreenRouteProp>();
  const {eventId, eventTitle} = route.params;
  const {showSnackbar} = useSnackbar();

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();

  // Use the paginated list hook
  const {
    data: expenses,
    isLoading,
    isFetching,
    isRefreshing,
    searchQuery,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages,
    showInitialLoader,
    ready,
  } = usePaginatedList<
    Expense,
    {eventId: string; page?: number; limit?: number; search?: string}
  >({
    queryHook: useGetExpensesQuery,
    queryParams: {eventId},
    limit: 10,
  });

  const [addExpense, {isLoading: isAdding}] = useAddExpenseMutation();
  const [updateExpense, {isLoading: isUpdating}] = useUpdateExpenseMutation();

  // Handle expense form submission
  const handleSubmit = async (data: Expense) => {
    let msg = 'Expense added successfully';
    if (selectedExpense) {
      await updateExpense({
        eventId,
        expenseId: selectedExpense.id,
        expense: data,
      });
      msg = 'Expense updated successfully';
    } else {
      await addExpense({eventId, expense: data});
    }
    showSnackbar(msg);
    setShowForm(false);
    setSelectedExpense(undefined);
  };

  // Handle edit expense
  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  // Show loading screen for initial load
  if (showInitialLoader) {
    return (
      <Surface style={styles.container}>
        <SearchHeader
          title={`${eventTitle} - Expenses`}
          onSearch={handleSearch}
          onAdd={() => {
            setSelectedExpense(undefined);
            setShowForm(true);
          }}
          placeholder="Search expenses..."
          isFetching={isFetching}
          goBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <LazyLoader loading={true}>
            <View />
          </LazyLoader>
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <SearchHeader
        title={`${eventTitle} - Expenses`}
        onSearch={handleSearch}
        onAdd={() => {
          setSelectedExpense(undefined);
          setShowForm(true);
        }}
        placeholder="Search expenses..."
        isFetching={isFetching}
        goBack={() => navigation.goBack()}
        showAddButton={false}
      />

      <View style={styles.content}>
        <FlatList
          data={expenses}
          renderItem={({item}) => (
            <ExpenseItem item={item} onPress={() => null} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            ready && expenses.length === 0 && !isLoading && !isFetching ? (
              <EmptyComponent
                msg={
                  searchQuery
                    ? `No expenses found for "${searchQuery}"`
                    : 'No expenses found.'
                }
              />
            ) : null
          }
          ItemSeparatorComponent={Divider}
          ListFooterComponent={
            ready && expenses.length > 0 && hasMorePages ? (
              <LoadMoreButton
                onPress={handleLoadMore}
                isLoading={isFetching}
                disabled={isFetching}
                hasMoreData={hasMorePages}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#6200ee']}
              tintColor="#6200ee"
            />
          }
        />
      </View>

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
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingVertical: 16,
    paddingBottom: 48,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
});

export default ExpensesListScreen;
