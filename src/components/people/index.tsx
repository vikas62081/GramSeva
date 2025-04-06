import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TabHeader from '../common/TabHeader';
import {Family} from './types';
import Member from './Member';
import {mockHeads} from '../mock';
import AddFamilyForm from './AddFamilyForm'; // Importing AddFamilyForm component
import Container from '../common/Container';

type RootStackParamList = {
  PeopleList: undefined;
  PeopleDetails: {familyId: string};
};

type PeopleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleList'
>;

interface PeopleScreenProps {
  navigation: PeopleScreenNavigationProp;
}

const PeopleContainer: React.FC<PeopleScreenProps> = ({navigation}) => {
  const [families, setFamilies] = useState<Family[]>(mockHeads);
  const [filteredFamilies, setFilteredFamilies] = useState(families);
  const [isAddingFamily, setIsAddingFamily] = useState(false);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredFamilies(families);
    } else {
      setFilteredFamilies(
        families.filter(family =>
          family.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  };

  const handleFamilyPress = (familyId: string) => {
    navigation.navigate('PeopleDetails', {familyId});
  };

  const handleAddFamily = () => {
    setIsAddingFamily(true);
  };

  const handleCancelAddFamily = () => {
    setIsAddingFamily(false);
  };

  const handleSaveFamily = (family: any) => {
    const newFamily = {
      id: new Date().toISOString(),
      name: family.name,
      relationship: 'Head',
      memberCount: 4,
    };

    setFamilies(prevFamilies => {
      const updatedFamilies = [...prevFamilies, newFamily];
      setFilteredFamilies(updatedFamilies);
      return updatedFamilies;
    });

    setIsAddingFamily(false);
  };

  return (
    <Container>
      <TabHeader
        title="People"
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
      <View style={styles.content}>
        <FlatList
          data={filteredFamilies}
          keyExtractor={item => item.id}
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

export default PeopleContainer;
