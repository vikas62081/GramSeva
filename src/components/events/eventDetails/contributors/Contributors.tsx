import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Button, Divider, Text, FAB} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {
  Contributor,
  EventDetailsScreenNavigationProp,
  IContributorForm,
} from '../../types';
import ContributorForm from './ContributorForm';
import {
  useAddContributorMutation,
  useGetContributorsQuery,
  useUpdateContributorMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';
import LazyLoader from '../../../common/LazyLoader';
import {useSnackbar} from '../../../../context/SnackbarContext';
import ContributorItem from './ContributorItem';
import {usePreviewList} from '../../../../hooks/usePreviewList';
import {useRBAC} from '../../../../context/RBACContext';

export interface ContributorsProps {
  eventId: string;
  eventTitle?: string;
  refetch: () => void;
}

const Contributors: React.FC<ContributorsProps> = ({
  eventId,
  eventTitle,
  refetch,
}) => {
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {showSnackbar} = useSnackbar();
  const {isAdmin} = useRBAC();

  // Use the preview list hook
  const {
    data: contributors,
    isLoading,
    isFetching,
  } = usePreviewList<Contributor>({
    queryHook: useGetContributorsQuery,
    queryParams: {eventId},
    limit: 5,
  });

  const [addContributor, {isLoading: isAdding}] = useAddContributorMutation();
  const [updateContributor, {isLoading: isUpdating}] =
    useUpdateContributorMutation();

  const [showForm, setShowForm] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<
    Contributor | undefined
  >();

  const handleSubmit = async (data: Contributor) => {
    try {
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
    } catch (error) {
      showSnackbar('Error saving contribution. Please try again.');
    }
  };

  const handleEdit = (contributor: Contributor) => {
    if (!isAdmin) return;
    setSelectedContributor(contributor);
    setShowForm(true);
  };

  const handleViewAll = () => {
    navigation.navigate('ContributorsList', {
      eventId,
      eventTitle: eventTitle || 'Event',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="group"
            size={20}
            color="#1976d2"
            style={{marginRight: 6}}
          />
          <Text variant="titleMedium">Contributors</Text>
        </View>
        <Button
          onPress={handleViewAll}
          mode="text"
          compact
          accessibilityLabel="View all contributors">
          View All
        </Button>
      </View>

      <LazyLoader loading={isLoading || isFetching} position="top">
        <FlatList
          data={contributors}
          renderItem={item => (
            <ContributorItem {...item} onPress={handleEdit} />
          )}
          keyExtractor={item =>
            item.id ? String(item.id) : Math.random().toString()
          }
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyComponent msg="No contribution found." />}
          contentContainerStyle={
            contributors.length === 0 ? {flex: 1} : undefined
          }
        />
      </LazyLoader>

      {isAdmin && (
        <FAB
          icon="add"
          style={styles.fab}
          label=""
          onPress={() => {
            setSelectedContributor(undefined);
            setShowForm(true);
          }}
          size="small"
          color="white"
          accessibilityLabel="Add Contributor"
        />
      )}
      {showForm && (
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

export default Contributors;
