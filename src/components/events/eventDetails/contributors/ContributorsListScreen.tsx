import React, {useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {Surface, Divider} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  Contributor,
  ContributorsListScreenRouteProp,
  IContributorForm,
} from '../../types';
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
import {usePaginatedList} from '../../../../hooks/usePaginatedList';

const ContributorsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ContributorsListScreenRouteProp>();
  const {eventId, eventTitle} = route.params;
  const {showSnackbar} = useSnackbar();

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<
    Contributor | undefined
  >();

  // Use the paginated list hook
  const {
    data: contributors,
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
    Contributor,
    {eventId: string; page?: number; limit?: number; search?: string}
  >({
    queryHook: useGetContributorsQuery,
    queryParams: {eventId},
    limit: 10,
  });

  const [addContributor, {isLoading: isAdding}] = useAddContributorMutation();
  const [updateContributor, {isLoading: isUpdating}] =
    useUpdateContributorMutation();

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
    setShowForm(false);
    setSelectedContributor(undefined);
  };

  // Handle edit contributor
  const handleEdit = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setShowForm(true);
  };

  // Show loading screen for initial load
  if (showInitialLoader) {
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
        showAddButton={false}
      />

      <View style={styles.content}>
        <FlatList
          data={contributors}
          renderItem={({item}) => (
            <ContributorItem item={item} onPress={() => null} />
          )}
          keyExtractor={item => item.id!}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            ready && contributors.length === 0 && !isLoading && !isFetching ? (
              <EmptyComponent
                msg={
                  searchQuery
                    ? `No contributors found for "${searchQuery}"`
                    : 'No contributors found.'
                }
              />
            ) : null
          }
          ItemSeparatorComponent={Divider}
          ListFooterComponent={
            ready && contributors.length > 0 && hasMorePages ? (
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

      <ContributorForm
        visible={showForm}
        isLoading={isAdding || isUpdating}
        onClose={() => {
          setShowForm(false);
          setSelectedContributor(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedContributor as unknown as IContributorForm}
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
