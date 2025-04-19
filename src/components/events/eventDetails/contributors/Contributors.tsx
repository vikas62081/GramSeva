import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Avatar, Button, Divider, List, Text, FAB} from 'react-native-paper';

import {Contributor} from '../../types';
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

export interface ContributorsProps {
  eventId: string;
  refetch: () => void;
}

const Contributors: React.FC<ContributorsProps> = ({eventId, refetch}) => {
  const {showSnackbar} = useSnackbar();
  const {
    data: contributors,
    isLoading,
    isFetching,
  } = useGetContributorsQuery(eventId);

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

  const renderItem = ({item}: {item: Contributor}) => (
    <List.Item
      title={item.name}
      description={formatDate(item.created_at!)}
      onPress={() => handleEdit(item)}
      left={props => <Avatar.Icon icon="person" size={40} />}
      right={() => <Text style={styles.amountText}>₹{item.amount}</Text>}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium">Contributors</Text>
        <Button>View All</Button>
      </View>

      <LazyLoader loading={isLoading || isFetching} position="top">
        <FlatList
          data={contributors || []}
          renderItem={renderItem}
          keyExtractor={item => item.id!}
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyComponent msg="No contribution found." />}
          contentContainerStyle={
            (contributors?.length ?? 0) === 0 ? {flex: 1} : undefined
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
  amountText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#28A745',
  },
});

export default Contributors;
