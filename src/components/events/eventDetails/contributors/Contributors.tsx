import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  List,
  ActivityIndicator,
  Text,
} from 'react-native-paper';

import {Contributor} from '../../types';
import ContributorForm from './ContributorForm';
import {formatDate} from '../../../../utils';
import {
  useAddContributorMutation,
  useGetContributorsQuery,
  useUpdateContributorMutation,
} from '../../../../store/slices/eventApiSlice';
import EmptyComponent from '../../../common/EmptyComponent';

export interface ContributorsProps {
  eventId: string;
  refetch: () => void;
}

const Contributors: React.FC<ContributorsProps> = ({eventId, refetch}) => {
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
    if (selectedContributor) {
      await updateContributor({
        eventId,
        contributorId: selectedContributor.id!,
        contributor: data,
      });
    } else {
      await addContributor({eventId, contributor: data});
    }
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
    <>
      <View style={styles.header}>
        <Text variant="titleMedium">Contributors</Text>
        <Button
          icon="add"
          mode="contained-tonal"
          onPress={() => {
            setSelectedContributor(undefined);
            setShowForm(true);
          }}>
          Add
        </Button>
      </View>

      {(isLoading || isFetching) && <ActivityIndicator animating />}

      <FlatList
        data={contributors || []}
        renderItem={renderItem}
        keyExtractor={item => item.id!}
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyComponent msg="No contribution found." />}
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
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  amountText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#28A745',
  },
});

export default Contributors;
