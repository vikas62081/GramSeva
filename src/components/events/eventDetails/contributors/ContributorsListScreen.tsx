import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {Surface, Divider} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Contributor, ContributorsListScreenRouteProp} from '../../types';
import {
  useGetContributorsQuery,
  useAddContributorMutation,
  useUpdateContributorMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';
import LazyLoader from '../../../common/LazyLoader';
import SearchHeader from '../../../common/SearchHeader';
import ContributorForm from './ContributorForm';
import {useSnackbar} from '../../../../context/SnackbarContext';
import ContributorItem from './ContributorItem';
import LoadMoreButton from '../../../common/LoadMoreButton';
import {Pagination} from '../../../../store/types';

const initialValues: Pagination<Contributor[]> = {
  data: [],
  total_count: 0,
  total_pages: 0,
  page: 1,
  limit: 0,
};

const ContributorsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ContributorsListScreenRouteProp>();
  const {eventId, eventTitle} = route.params;
  const {showSnackbar} = useSnackbar();

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allContributors, setAllContributors] =
    useState<Pagination<Contributor[]>>(initialValues);
  const [showForm, setShowForm] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<
    Contributor | undefined
  >();

  // API queries
  const {
    data: contributorsResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetContributorsQuery({
    eventId,
    page: currentPage,
    limit: 10,
    search: searchQuery,
  });

  const [addContributor, {isLoading: isAdding}] = useAddContributorMutation();
  const [updateContributor, {isLoading: isUpdating}] =
    useUpdateContributorMutation();

  // Update local state when API response changes
  useEffect(() => {
    if (contributorsResponse) {
      if (currentPage === 1) {
        setAllContributors(contributorsResponse);
      } else {
        setAllContributors(prev => ({
          ...contributorsResponse,
          data: [...prev.data, ...contributorsResponse.data],
        }));
      }
    }
  }, [contributorsResponse]);

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

  // Handle contributor form submission
  const handleSubmit = async (data: Contributor) => {
    let msg = 'Contribution added successfully';
    if (selectedContributor) {
      await updateContributor({
        eventId,
        contributorId: selectedContributor.id!,
        contributor: data,
      });
      msg = 'Contribution updated successfully';
    } else {
      await addContributor({eventId, contributor: data});
    }
    showSnackbar(msg);
    await refetch();
    setShowForm(false);
    setSelectedContributor(undefined);
  };

  // Handle edit contributor
  const handleEdit = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setShowForm(true);
  };

  // Check if there are more pages to load
  const hasMorePages = allContributors.page < allContributors.total_pages;

  // Show loading screen for initial load
  if (isLoading && allContributors.data.length === 0) {
    return (
      <Surface style={styles.container}>
        <SearchHeader
          title={`${eventTitle} - Contributors`}
          onSearch={handleSearch}
          onAdd={() => {
            setSelectedContributor(undefined);
            setShowForm(true);
          }}
          placeholder="Search contributors..."
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
        title={`${eventTitle} - Contributors`}
        onSearch={handleSearch}
        onAdd={() => {
          setSelectedContributor(undefined);
          setShowForm(true);
        }}
        placeholder="Search contributors..."
        isFetching={isFetching}
        goBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <FlatList
          data={allContributors.data}
          renderItem={({item}) => (
            <ContributorItem item={item} onPress={handleEdit} />
          )}
          keyExtractor={item => item.id!}
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
                    ? `No contributors found for "${searchQuery}"`
                    : 'No contributors found.'
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

      <ContributorForm
        visible={showForm}
        isLoading={isAdding || isUpdating}
        onClose={() => {
          setShowForm(false);
          setSelectedContributor(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedContributor}
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

export default ContributorsListScreen;
