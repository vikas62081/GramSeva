import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {
  Surface,
  Text,
  Button,
  Avatar,
  Card,
  IconButton,
  Divider,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Expense, ExpensesListScreenRouteProp} from '../../types';
import {formatDate} from '../../../../utils';
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
import {Pagination} from '../../../../store/types';

const initialValues: Pagination<Expense[]> = {
  data: [],
  total_count: 0,
  total_pages: 0,
  page: 1,
  limit: 0,
};

const ExpensesListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ExpensesListScreenRouteProp>();
  const {eventId, eventTitle} = route.params;
  const {showSnackbar} = useSnackbar();

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allExpenses, setAllExpenses] =
    useState<Pagination<Expense[]>>(initialValues);
  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();

  // API queries
  const {
    data: expensesResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetExpensesQuery({
    eventId,
    page: currentPage,
    limit: 10,
    search: searchQuery,
  });

  const [addExpense, {isLoading: isAdding}] = useAddExpenseMutation();
  const [updateExpense, {isLoading: isUpdating}] = useUpdateExpenseMutation();

  // Update local state when API response changes
  useEffect(() => {
    if (expensesResponse) {
      if (currentPage === 1) {
        setAllExpenses(expensesResponse);
      } else {
        setAllExpenses(prev => ({
          ...expensesResponse,
          data: [...prev.data, ...expensesResponse.data],
        }));
      }
    }
  }, [expensesResponse]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

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
    await refetch();
    setShowForm(false);
    setSelectedExpense(undefined);
  };

  // Handle edit expense
  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  // Check if there are more pages to load
  const hasMorePages = allExpenses.page < allExpenses.total_pages;

  // Show loading screen for initial load
  if (isLoading && allExpenses.data.length === 0) {
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
      />

      <View style={styles.content}>
        <FlatList
          data={allExpenses.data}
          renderItem={({item}) => (
            <ExpenseItem item={item} onPress={handleEdit} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            isLoading || isFetching ? (
              <View style={styles.loadingContainer}>
                <LazyLoader loading={true}>
                  <View />
                </LazyLoader>
              </View>
            ) : (
              <EmptyComponent
                msg={
                  searchQuery
                    ? `No expenses found for "${searchQuery}"`
                    : 'No expenses found.'
                }
              />
            )
          }
          ItemSeparatorComponent={Divider}
          ListFooterComponent={
            <LoadMoreButton
              onPress={handleLoadMore}
              isLoading={isFetching}
              disabled={isFetching}
              hasMoreData={hasMorePages}
            />
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
