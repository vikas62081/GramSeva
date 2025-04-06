import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TabHeader from '../common/TabHeader';
import {Family} from './types';
import Member from './Member';
import AddFamilyForm from './AddFamilyForm'; // Importing AddFamilyForm component
import Container from '../common/Container';
import {
  useCreateFamilyMutation,
  useGetFamiliesQuery,
} from '../../store/slices/familyApiSlice';

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

  const [createFamily, {isError, error: e}] = useCreateFamilyMutation();
  console.log(e);
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
      <TabHeader
        title="Family"
        showSearch
        onSearch={handleSearch}
        onAdd={handleAddFamily}
      />
      {isAddingFamily && (
        <AddFamilyForm
          selectedMember={null}
          onClose={handleCancelAddFamily}
          onSave={handleSaveFamily}
        />
      )}
      <ActivityIndicator animating={isFetching || isLoading} />
      <View style={styles.content}>
        <FlatList
          data={data?.data || []}
          keyExtractor={item => item.id!}
          renderItem={({item}) => (
            <Member key={item.id} family={item} onPress={handleFamilyPress} />
          )}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 120}}>
              No members found.
            </Text>
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default FamilyContainer;
