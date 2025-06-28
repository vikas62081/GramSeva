import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useMemo,
} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Family} from './types';
import Member from './Member';
import AddFamilyForm from './AddFamilyForm';
import {
  useCreateFamilyMutation,
  useGetFamiliesQuery,
} from '../../store/slices/familyApiSlice';
import EmptyComponent from '../common/EmptyComponent';
import {Surface, Button} from 'react-native-paper';
import LazyLoader from '../common/LazyLoader';
import SearchHeader from '../common/SearchHeader';
import {useSnackbar} from '../../context/SnackbarContext';

type RootStackParamList = {
  FamilyList: undefined;
  FamilyDetails: {familyId: string};
};

type FamilyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FamilyList'
>;

interface FamilyScreenProps {
  navigation: FamilyScreenNavigationProp;
}

interface AllFamiliesProps {
  data: Family[];
  total_count: number;
  total_pages: number;
  page: number;
}

const initialValues: AllFamiliesProps = {
  data: [],
  total_count: 0,
  total_pages: 0,
  page: 1,
};

const FamilyContainer: React.FC<FamilyScreenProps> = ({navigation}) => {
  const {showSnackbar} = useSnackbar();

  // State management
  const [allFamilies, setAllFamilies] =
    useState<AllFamiliesProps>(initialValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddingFamily, setIsAddingFamily] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // API query
  const {
    data: familiesResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetFamiliesQuery({
    page: currentPage,
    limit: 8,
    search: searchQuery || undefined,
  });

  const [createFamily, {isLoading: creatingFamily}] = useCreateFamilyMutation();

  // Update local state when API response changes
  useEffect(() => {
    if (familiesResponse) {
      if (currentPage === 1) {
        setAllFamilies(familiesResponse);
      } else {
        setAllFamilies(prev => ({
          ...familiesResponse,
          data: [...(prev.data || []), ...(familiesResponse.data || [])],
        }));
      }
    }
  }, [familiesResponse]);

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

  // Handle load more button
  const handleLoadMore = useCallback(() => {
    const {total_pages, page: responsePage} = allFamilies;
    if (responsePage < total_pages) {
      setCurrentPage(responsePage + 1);
    }
  }, [allFamilies]);

  // Handle family added
  const handleFamilyAdded = useCallback(async () => {
    setCurrentPage(1);
    await refetch();
  }, [refetch]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Check if there are more pages to load
  const hasMorePages = allFamilies.page < allFamilies.total_pages;

  // Render load more button
  const renderLoadMoreButton = useCallback(() => {
    if (!hasMorePages || !allFamilies.data) {
      return null;
    }

    return (
      <View style={styles.loadMoreContainer}>
        <Button
          mode="elevated"
          onPress={handleLoadMore}
          loading={isFetching}
          disabled={isFetching}
          style={styles.loadMoreButton}>
          {isFetching ? 'Loading...' : 'Load More'}
        </Button>
      </View>
    );
  }, [hasMorePages, allFamilies.data, handleLoadMore, isFetching]);

  const handleFamilyPress = (familyId: string) => {
    navigation.navigate('FamilyDetails', {familyId});
  };

  const handleAddFamily = () => {
    setIsAddingFamily(true);
  };

  const handleCancelAddFamily = () => {
    setIsAddingFamily(false);
  };

  const handleSaveFamily = async (family: Family) => {
    try {
      await createFamily(family).unwrap();
      showSnackbar('Family added successfully');
      setIsAddingFamily(false);
      // Refresh the list after adding family
      handleFamilyAdded();
    } catch {
      showSnackbar('Failed to add family', 'error');
    }
  };

  // Show loading screen for initial load
  if (isLoading && allFamilies.data?.length === 0) {
    return (
      <Surface style={styles.container}>
        <SearchHeader
          title="Family"
          onSearch={handleSearch}
          onAdd={handleAddFamily}
          placeholder="Search families..."
          isFetching={isFetching}
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
        title="Family"
        onSearch={handleSearch}
        onAdd={handleAddFamily}
        placeholder="Search families..."
        isFetching={isFetching}
      />

      {isAddingFamily && (
        <AddFamilyForm
          selectedMember={null}
          onClose={handleCancelAddFamily}
          onSave={handleSaveFamily}
          isLoading={creatingFamily}
        />
      )}

      <View style={styles.content}>
        <FlatList
          data={allFamilies.data || []}
          keyExtractor={item => item.id!}
          renderItem={({item}) => (
            <Member key={item.id} family={item} onPress={handleFamilyPress} />
          )}
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
                    ? `No families found for "${searchQuery}"`
                    : 'No family found.'
                }
              />
            )
          }
          ListFooterComponent={renderLoadMoreButton}
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
    paddingTop: 8,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 60,
  },
  loadMoreContainer: {
    alignItems: 'center',
  },
  loadMoreButton: {
    minWidth: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FamilyContainer;
