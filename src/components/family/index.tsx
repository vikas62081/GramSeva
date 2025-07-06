import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Alert} from 'react-native';
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
import {useRBAC} from '../../context/RBACContext';

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
  const {isAdmin, isPendingUser} = useRBAC();

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
    showInitialLoader,
    ready,
  } = usePaginatedList<
    Family,
    {page?: number; limit?: number; search?: string}
  >({
    queryHook: useGetFamiliesQuery,
    limit: 8,
  });

  const [createFamily, {isLoading: creatingFamily}] = useCreateFamilyMutation();

  // Handle family added
  const handleFamilyAdded = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleFamilyPress = (familyId: string) => {
    if (isPendingUser) {
      Alert.alert(
        'Access Denied',
        'Your account is still pending approval. You’ll get access once it’s reviewed.',
      );
      return;
    }
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
  if (showInitialLoader) {
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
        showAddButton={isAdmin}
      />

      {isAddingFamily && (
        <View style={styles.modalOverlay}>
          <AddFamilyForm
            selectedMember={null}
            onClose={handleCancelAddFamily}
            onSave={handleSaveFamily}
            isLoading={creatingFamily}
          />
        </View>
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
            ready && families.length === 0 && !isLoading && !isFetching ? (
              <EmptyComponent
                msg={
                  searchQuery
                    ? `No families found for "${searchQuery}"`
                    : 'No family found.'
                }
              />
            ) : null
          }
          ListFooterComponent={
            ready && families.length > 0 && hasMorePages ? (
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
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  listContainer: {
    gap: 14,
    paddingBottom: 32,
    paddingTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FamilyContainer;
