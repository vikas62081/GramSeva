import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Avatar, Button, Divider, List, Text, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {Contributor, EventDetailsScreenNavigationProp} from '../../types';
import ContributorForm from './ContributorForm';
import {formatDate} from '../../../../utils';
import {
  useAddContributorMutation,
  useGetContributorsQuery,
  useUpdateContributorMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';
import LazyLoader from '../../../common/LazyLoader';
import {useSnackbar} from '../../../../context/SnackbarContext';
import ContributorItem from './ContributorItem';

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
  const {
    data: contributors,
    isLoading,
    isFetching,
  } = useGetContributorsQuery({eventId, limit: 5});

  const [addContributor, {isLoading: isAdding}] = useAddContributorMutation();
  const [updateContributor, {isLoading: isUpdating}] =
    useUpdateContributorMutation();

  const [showForm, setShowForm] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<
    Contributor | undefined
  >();

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

  const handleEdit = (contributor: Contributor) => {
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
        <Text variant="titleMedium">Contributors</Text>
        <Button onPress={handleViewAll}>View All</Button>
      </View>

      <LazyLoader loading={isLoading || isFetching} position="top">
        <FlatList
          data={contributors?.data || []}
          renderItem={item => (
            <ContributorItem {...item} onPress={handleEdit} />
          )}
          keyExtractor={item => item.id!}
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyComponent msg="No contribution found." />}
          contentContainerStyle={
            (contributors?.data?.length ?? 0) === 0 ? {flex: 1} : undefined
          }
        />
      </LazyLoader>

      <FAB
        icon="add"
        style={styles.fab}
        label="Add"
        onPress={() => {
          setSelectedContributor(undefined);
          setShowForm(true);
        }}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 24,
  },
});

export default Contributors;
