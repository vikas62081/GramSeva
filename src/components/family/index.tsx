import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Family} from './types';
import Member from './Member';
import AddFamilyForm from './AddFamilyForm'; // Importing AddFamilyForm component
import Container from '../common/Container';
import {
  useCreateFamilyMutation,
  useGetFamiliesQuery,
} from '../../store/slices/familyApiSlice';
import EmptyComponent from '../common/EmptyComponent';
import {Appbar} from 'react-native-paper';
import LoadingSpinner from '../common/LoadingSpinner';

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
  const [page, setPage] = useState(1);
  const {data, isLoading, error, isFetching} = useGetFamiliesQuery({
    page,
    limit: 10,
  });

  const [createFamily, {isLoading: creatingFamily}] = useCreateFamilyMutation();

  const [isAddingFamily, setIsAddingFamily] = useState(false);

  const handleSearch = (query: string) => {};

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
      setIsAddingFamily(false);
    } catch {
      Alert.alert('Error', 'Failed to create family');
    }
  };

  return (
    <Container>
      {/* <TabHeader
        title="Family"
        showSearch
        onSearch={handleSearch}
        onAdd={handleAddFamily}
      /> */}
      <Appbar.Header>
        <Appbar.Content title="Family" />
        <Appbar.Action icon="search" onPress={() => handleSearch} />
        <Appbar.Action icon="add" onPress={handleAddFamily} />
      </Appbar.Header>
      {isAddingFamily && (
        <AddFamilyForm
          selectedMember={null}
          onClose={handleCancelAddFamily}
          onSave={handleSaveFamily}
          isLoading={creatingFamily}
        />
      )}
      <LoadingSpinner loading={isLoading || isFetching}>
        <View style={styles.content}>
          <FlatList
            data={data?.data || []}
            keyExtractor={item => item.id!}
            renderItem={({item}) => (
              <Member key={item.id} family={item} onPress={handleFamilyPress} />
            )}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<EmptyComponent msg="No family found." />}
          />
        </View>
      </LoadingSpinner>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 80,
    gap: 12,
  },
});

export default FamilyContainer;
