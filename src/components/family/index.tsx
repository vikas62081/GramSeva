import React, {useState, useCallback} from 'react';
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
import {Surface} from 'react-native-paper';
import LazyLoader from '../common/LazyLoader';
import SearchHeader from '../common/SearchHeader';
import {useSnackbar} from '../../context/SnackbarContext';
import LoadMoreButton from '../common/LoadMoreButton';
import {usePaginatedList} from '../../hooks/usePaginatedList';

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

const FamilyContainer: React.FC<FamilyScreenProps> = ({navigation}) => {
  const {showSnackbar} = useSnackbar();

  // State management
  const [isAddingFamily, setIsAddingFamily] = useState(false);

  // Use the paginated list hook
  const {
    data: families,
    isLoading,
    isFetching,
    isRefreshing,
    searchQuery,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages,
    refetch,
  } = usePaginatedList<Family>({
    queryHook: useGetFamiliesQuery,
    limit: 8,
  });

  const [createFamily, {isLoading: creatingFamily}] = useCreateFamilyMutation();

  // Handle family added
  const handleFamilyAdded = useCallback(async () => {
    await refetch();
  }, [refetch]);

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
  if (isLoading && families.length === 0) {
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
          data={families}
          keyExtractor={item => item.id!}
          renderItem={({item}) => (
            <Member key={item.id} family={item} onPress={handleFamilyPress} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.9}
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
    // paddingBottom: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FamilyContainer;
